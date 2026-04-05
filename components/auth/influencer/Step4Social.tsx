"use client";

import { useState } from "react";
import { X, Check } from "lucide-react";
import { StepCard } from "../StepCard";
import { TwoLayerTag } from "@/components/marketing/TwoLayerTag";
import { InfluencerFormData, Niche, SocialAccountDraft } from "@/lib/types/auth";

interface Props {
  data: InfluencerFormData;
  onNext: (partial: Partial<InfluencerFormData>) => void;
  onBack: () => void;
}

const inputClass =
  "w-full rounded-lg border border-gray-200 dark:border-gray-700 px-4 py-3 text-sm bg-white dark:bg-gray-900 text-foreground focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-colors";

const PARENT_NICHES = [
  "Фитнес",
  "Мода",
  "Еда",
  "Технологии",
  "Бьюти",
  "Путешествия",
  "Финансы",
  "Образование",
];


interface SocialCardProps {
  platform: "tiktok" | "instagram";
  label: string;
  icon: React.ReactNode;
  account: SocialAccountDraft | null;
  onSave: (draft: SocialAccountDraft) => void;
  onRemove: () => void;
}

function SocialCard({ platform, label, icon, account, onSave, onRemove }: SocialCardProps) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [followers, setFollowers] = useState("");
  const [posts, setPosts] = useState("");

  function save() {
    if (!username.trim()) return;
    onSave({
      platform,
      username: username.trim(),
      followers_count: parseInt(followers) || 0,
      following_count: 0,
      posts_count: parseInt(posts) || 0,
      is_manual: true,
    });
    setOpen(false);
  }

  return (
    <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon}
          <span className="font-medium text-sm text-foreground">{label}</span>
          <span className="text-xs text-muted-foreground bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
            OAuth скоро
          </span>
        </div>
        {account ? (
          <button
            onClick={onRemove}
            className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
          >
            Отключить
          </button>
        ) : (
          <button
            onClick={() => setOpen(!open)}
            className="text-xs font-medium text-brand hover:underline"
          >
            Подключить
          </button>
        )}
      </div>

      {account && (
        <div className="flex items-center gap-2 text-sm">
          <Check className="w-4 h-4 text-green-500" />
          <span className="font-medium text-foreground">@{account.username}</span>
          <span className="text-muted-foreground">{account.followers_count.toLocaleString()} подписчиков</span>
        </div>
      )}

      {!account && open && (
        <div className="flex flex-col gap-3 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">@username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="username"
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Подписчиков</label>
              <input
                type="number"
                value={followers}
                onChange={(e) => setFollowers(e.target.value)}
                placeholder="12500"
                className={inputClass}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Публикаций</label>
              <input
                type="number"
                value={posts}
                onChange={(e) => setPosts(e.target.value)}
                placeholder="340"
                className={inputClass}
              />
            </div>
          </div>
          <button
            onClick={save}
            className="bg-brand text-white rounded-lg py-2 text-sm font-semibold hover:bg-brand-hover transition-colors"
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
}

function TikTokIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.94a8.19 8.19 0 0 0 4.77 1.52V7.01a4.85 4.85 0 0 1-1-.32z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function Step4Social({ data, onNext, onBack }: Props) {
  const [selectedParents, setSelectedParents] = useState<string[]>(
    data.niches.map((n) => n.parent)
  );
  const [nicheMap, setNicheMap] = useState<Record<string, string[]>>(
    Object.fromEntries(data.niches.map((n) => [n.parent, n.children]))
  );
  const [childInputs, setChildInputs] = useState<Record<string, string>>({});
  const [accounts, setAccounts] = useState<Record<string, SocialAccountDraft>>(
    Object.fromEntries(data.social_accounts.map((a) => [a.platform, a]))
  );

  function toggleParent(parent: string) {
    setSelectedParents((prev) =>
      prev.includes(parent) ? prev.filter((p) => p !== parent) : [...prev, parent]
    );
    if (!nicheMap[parent]) {
      setNicheMap((prev) => ({ ...prev, [parent]: [] }));
    }
  }

  function addChild(parent: string) {
    const val = (childInputs[parent] || "").trim();
    if (!val) return;
    setNicheMap((prev) => ({
      ...prev,
      [parent]: [...(prev[parent] || []), val],
    }));
    setChildInputs((prev) => ({ ...prev, [parent]: "" }));
  }

  function removeChild(parent: string, child: string) {
    setNicheMap((prev) => ({
      ...prev,
      [parent]: (prev[parent] || []).filter((c) => c !== child),
    }));
  }

  function handleNext() {
    const niches: Niche[] = selectedParents.map((p) => ({
      parent: p,
      children: nicheMap[p] || [],
    }));
    const social_accounts = Object.values(accounts);
    onNext({ niches, social_accounts });
  }

  return (
    <StepCard
      step={4}
      totalSteps={5}
      onBack={onBack}
      showBack
      ctaLabel="Далее"
      onNext={handleNext}
      secondaryAction={
        <button
          onClick={() => onNext({ niches: [], social_accounts: [] })}
          className="text-sm text-muted-foreground hover:text-foreground text-center transition-colors"
        >
          Пропустить
        </button>
      }
    >
      <div className="flex flex-col gap-1">
        <h2 className="font-headline text-4xl uppercase text-foreground leading-none">
          Ниша и соцсети
        </h2>
        <p className="text-sm text-muted-foreground">Шаг 4 из 5 — необязательно</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* NICHES */}
        <div className="flex flex-col gap-3">
          <label className="text-sm font-medium text-foreground">
            Ваша ниша{" "}
            <span className="text-muted-foreground font-normal">(необязательно)</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {PARENT_NICHES.map((parent) => (
              <button
                key={parent}
                onClick={() => toggleParent(parent)}
                className={`rounded-full px-4 py-2 text-sm font-medium border-2 transition-colors ${
                  selectedParents.includes(parent)
                    ? "border-brand bg-brand text-white"
                    : "border-gray-200 dark:border-gray-700 text-foreground hover:border-brand"
                }`}
              >
                {parent}
              </button>
            ))}
          </div>

          {selectedParents.length > 0 && (
            <div className="flex flex-col gap-4 pt-2">
              {selectedParents.map((parent) => (
                <div key={parent} className="flex flex-col gap-2">
                  <TwoLayerTag
                    parent={parent}
                    items={nicheMap[parent] || []}
                  />
                  {/* Children pill list with remove */}
                  {(nicheMap[parent] || []).length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pl-3">
                      {(nicheMap[parent] || []).map((child) => (
                        <span
                          key={child}
                          className="flex items-center gap-1 border border-brand text-brand text-xs px-2.5 py-1 rounded-full"
                        >
                          {child}
                          <button
                            onClick={() => removeChild(parent, child)}
                            className="hover:text-red-500 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Child input */}
                  <div className="flex gap-2 pl-3">
                    <input
                      type="text"
                      value={childInputs[parent] || ""}
                      onChange={(e) =>
                        setChildInputs((prev) => ({ ...prev, [parent]: e.target.value }))
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") addChild(parent);
                      }}
                      placeholder="Уточните нишу"
                      className={`${inputClass} text-xs py-2`}
                    />
                    <button
                      onClick={() => addChild(parent)}
                      className="shrink-0 bg-brand text-white text-xs px-3 rounded-lg hover:bg-brand-hover transition-colors"
                    >
                      Добавить
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SOCIAL ACCOUNTS */}
        <div className="flex flex-col gap-3">
          <div>
            <label className="text-sm font-medium text-foreground block">
              Подключите аккаунты
            </label>
            <p className="text-xs text-muted-foreground mt-0.5">
              Нужно для скоринга и аналитики аудитории
            </p>
          </div>
          <SocialCard
            platform="tiktok"
            label="TikTok"
            icon={<TikTokIcon />}
            account={accounts.tiktok || null}
            onSave={(draft) => setAccounts((prev) => ({ ...prev, tiktok: draft }))}
            onRemove={() =>
              setAccounts((prev) => {
                const next = { ...prev };
                delete next.tiktok;
                return next;
              })
            }
          />
          <SocialCard
            platform="instagram"
            label="Instagram"
            icon={<InstagramIcon />}
            account={accounts.instagram || null}
            onSave={(draft) => setAccounts((prev) => ({ ...prev, instagram: draft }))}
            onRemove={() =>
              setAccounts((prev) => {
                const next = { ...prev };
                delete next.instagram;
                return next;
              })
            }
          />
        </div>
      </div>
    </StepCard>
  );
}
