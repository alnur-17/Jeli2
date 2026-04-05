"use client";

import { useCallback, useRef, useState } from "react";
import { StepWrapper } from "@/components/auth/StepWrapper";
import { RoleSelector } from "@/components/auth/RoleSelector";

// Influencer steps
import { Step1Basic } from "@/components/auth/influencer/Step1Basic";
import { Step2Bio } from "@/components/auth/influencer/Step2Bio";
import { Step3Demographics } from "@/components/auth/influencer/Step3Demographics";
import { Step4Social } from "@/components/auth/influencer/Step4Social";
import { Step5Welcome } from "@/components/auth/influencer/Step5Welcome";

// Business steps
import { Step1Company } from "@/components/auth/business/Step1Company";
import { Step2Bio as BizStep2Bio } from "@/components/auth/business/Step2Bio";
import { Step3Sphere } from "@/components/auth/business/Step3Sphere";
import { Step4Verify } from "@/components/auth/business/Step4Verify";

import {
  Role,
  InfluencerFormData,
  BusinessFormData,
  INFLUENCER_DEFAULTS,
  BUSINESS_DEFAULTS,
} from "@/lib/types/auth";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
  const [role, setRole] = useState<Role | null>(null);
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [influencerData, setInfluencerData] =
    useState<InfluencerFormData>(INFLUENCER_DEFAULTS);
  const [businessData, setBusinessData] =
    useState<BusinessFormData>(BUSINESS_DEFAULTS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const submittingRef = useRef(false);

  function handleSelectRole(r: Role) {
    setRole(r);
    setStep(1);
    setDirection(1);
  }

  function handleNext(partial: Partial<InfluencerFormData | BusinessFormData>) {
    if (role === "influencer") {
      setInfluencerData((prev) => ({
        ...prev,
        ...(partial as Partial<InfluencerFormData>),
      }));
    } else {
      setBusinessData((prev) => ({
        ...prev,
        ...(partial as Partial<BusinessFormData>),
      }));
    }
    setDirection(1);
    setStep((prev) => prev + 1);
  }

  function handleBack() {
    setDirection(-1);
    setStep((prev) => {
      if (prev <= 1) {
        setRole(null);
        return 0;
      }
      return prev - 1;
    });
  }

  const handleSubmitInfluencer = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Превышено время ожидания. Проверьте соединение.")), 15000)
    );

    const run = async () => {
      const supabase = createClient();

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: influencerData.email,
        password: influencerData.password,
        options: { data: { role: "influencer", username: influencerData.username } },
      });
      if (signUpError) throw new Error(signUpError.message);
      const user = signUpData.user;
      if (!user) throw new Error("Не удалось создать аккаунт");

      const { error: profileError } = await supabase
        .from("profiles").insert({ id: user.id, role: "influencer" });
      if (profileError) throw new Error(`profiles: ${profileError.message}`);

      const { error: infError } = await supabase
        .from("influencer_profiles").insert({
          id: user.id,
          username: influencerData.username,
          full_name: influencerData.full_name || null,
          bio: influencerData.bio || null,
          gender: influencerData.gender || null,
          age: influencerData.age ? parseInt(influencerData.age) : null,
        });
      if (infError) throw new Error(`influencer_profiles: ${infError.message}`);

      if (influencerData.niches.length > 0) {
        const { error: nicheError } = await supabase.from("niches").insert(
          influencerData.niches.map((n) => ({ influencer_id: user.id, parent: n.parent, children: n.children }))
        );
        if (nicheError) throw new Error(`niches: ${nicheError.message}`);
      }

      if (influencerData.social_accounts.length > 0) {
        const { error: socialError } = await supabase.from("social_accounts").insert(
          influencerData.social_accounts.map((a) => ({
            influencer_id: user.id, platform: a.platform,
            handle: a.username, followers_count: a.followers_count ?? 0, engagement_rate: 0,
          }))
        );
        if (socialError) throw new Error(`social_accounts: ${socialError.message}`);
      }

      // Get session (works if email confirmation is disabled in Supabase)
      const { data: { session } } = await supabase.auth.getSession();
      return { supabase, session };
    };

    try {
      const { supabase, session } = await Promise.race([run(), timeout]);
      setSuccess(true);

      if (session) {
        window.location.href = "/app/dashboard";
      } else {
        const { data } = await supabase.auth.signInWithPassword({
          email: influencerData.email,
          password: influencerData.password,
        });
        if (data?.session) window.location.href = "/app/dashboard";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      submittingRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  }, [influencerData]);

  const handleSubmitBusiness = useCallback(async () => {
    if (submittingRef.current) return;
    submittingRef.current = true;
    setIsSubmitting(true);
    setError(null);

    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("Превышено время ожидания. Проверьте соединение.")), 15000)
    );

    const run = async () => {
      const supabase = createClient();

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: businessData.email,
        password: businessData.password,
      });
      if (signUpError) throw new Error(signUpError.message);
      const user = signUpData.user;
      if (!user) throw new Error("Не удалось создать аккаунт");

      const { error: profileError } = await supabase
        .from("profiles").insert({ id: user.id, role: "business" });
      if (profileError) throw new Error(`profiles: ${profileError.message}`);

      const { error: bizError } = await supabase
        .from("business_profiles").insert({
          id: user.id,
          company_name: businessData.company_name,
          company_type: businessData.company_type || null,
          bin: businessData.bin || null,
          bio: businessData.bio || null,
          website: businessData.website || null,
          sphere: businessData.sphere || null,
        });
      if (bizError) throw new Error(`business_profiles: ${bizError.message}`);

      const { data: { session } } = await supabase.auth.getSession();
      return { supabase, session };
    };

    try {
      const { supabase, session } = await Promise.race([run(), timeout]);
      setSuccess(true);

      if (session) {
        window.location.href = "/app/dashboard";
      } else {
        const { data } = await supabase.auth.signInWithPassword({
          email: businessData.email,
          password: businessData.password,
        });
        if (data?.session) window.location.href = "/app/dashboard";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
      submittingRef.current = false;
    } finally {
      setIsSubmitting(false);
    }
  }, [businessData]);

  // Render: step 0 = role selector
  if (!role || step === 0) {
    return (
      <StepWrapper step={0} direction={direction}>
        <RoleSelector onSelect={handleSelectRole} />
      </StepWrapper>
    );
  }

  if (role === "influencer") {
    return (
      <StepWrapper step={step} direction={direction}>
        {step === 1 && (
          <Step1Basic
            data={influencerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 2 && (
          <Step2Bio
            data={influencerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 3 && (
          <Step3Demographics
            data={influencerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 4 && (
          <Step4Social
            data={influencerData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {step === 5 && (
          <Step5Welcome
            data={influencerData}
            onSubmit={handleSubmitInfluencer}
            isSubmitting={isSubmitting}
            error={error}
            success={success}
            onBack={handleBack}
          />
        )}
      </StepWrapper>
    );
  }

  // Business flow
  return (
    <StepWrapper step={step} direction={direction}>
      {step === 1 && (
        <Step1Company
          data={businessData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 2 && (
        <BizStep2Bio
          data={businessData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 3 && (
        <Step3Sphere
          data={businessData}
          onNext={handleNext}
          onBack={handleBack}
        />
      )}
      {step === 4 && (
        <Step4Verify
          data={businessData}
          onSubmit={handleSubmitBusiness}
          isSubmitting={isSubmitting}
          error={error}
          success={success}
          onBack={handleBack}
        />
      )}
    </StepWrapper>
  );
}
