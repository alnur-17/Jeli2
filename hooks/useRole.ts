"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Role = "business" | "influencer" | null;

export function useRole() {
  const [role, setRole] = useState<Role>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    const supabase = createClient();

    async function fetchRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserName(user.user_metadata?.username || user.email?.split("@")[0] || "");

      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole((data?.role as Role) ?? "business");
      setLoading(false);
    }

    fetchRole();
  }, []);

  return {
    role,
    loading,
    userName,
    isBusiness: role === "business",
    isInfluencer: role === "influencer",
  };
}
