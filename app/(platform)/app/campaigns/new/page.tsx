"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormData {
  // Step 1: Brief
  title: string;
  niche: string;
  platform: string;
  goal: string;
  startDate: string;
  endDate: string;
  // Step 2: Audience & Budget
  targetGender: string;
  targetAgeMin: string;
  targetAgeMax: string;
  targetCities: string[];
  budget: string;
  influencersCount: string;
  // Step 3: Content
  formats: string[];
  requirements: string;
  tone: string;
  examples: string;
}

const DEFAULTS: FormData = {
  title: "", niche: "", platform: "", goal: "",
  startDate: "", endDate: "",
  targetGender: "all", targetAgeMin: "18", targetAgeMax: "35",
  targetCities: [], budget: "", influencersCount: "",
  formats: [], requirements: "", tone: "", examples: "",
};

const NICHES = ["Еда", "Фитнес", "Технологии", "Бьюти", "Авто", "Финансы", "Лайфстайл", "Мода", "Образование", "Путешествия"];
const PLATFORMS = [
  { value: "tiktok",     label: "TikTok" },
  { value: "instagram",  label: "Instagram" },
  { value: "youtube",    label: "YouTube" },
  { value: "all",        label: "Все платформы" },
];
const GOALS = [
  { value: "awareness",   label: "Узнаваемость бренда" },
  { value: "traffic",     label: "Трафик на сайт" },
  { value: "sales",       label: "Продажи" },
  { value: "engagement",  label: "Вовлечённость" },
  { value: "launch",      label: "Запуск продукта" },
];
const CITIES = ["Алматы", "Астана", "Шымкент", "Актобе", "Каскелен"];
const FORMATS = ["Stories", "TikTok видео", "Reels", "YouTube интеграция", "YouTube Shorts", "Коллаборация", "Пост"];
const TONES = ["Дружелюбный", "Профессиональный", "Юмористический", "Вдохновляющий", "Образовательный"];

const STEPS = ["Бриф", "Аудитория и бюджет", "Контент"];

// ─── Field helpers ────────────────────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs text-white/40 mb-1 block">{children}</label>;
}

function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
    />
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }: {
  value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className="w-full bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
    />
  );
}

function Select({ value, onChange, options }: {
  value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-colors appearance-none"
    >
      <option value="">Выбрать...</option>
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function PillToggle({ value, options, onChange }: {
  value: string[]; options: string[]; onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    onChange(value.includes(opt) ? value.filter((x) => x !== opt) : [...value, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          onClick={() => toggle(opt)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
            value.includes(opt)
              ? "bg-[#0064FF] border-[#0064FF] text-white"
              : "border-white/[0.06] text-white/40 hover:text-white hover:border-white/20"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

// ─── Steps ────────────────────────────────────────────────────────────────────

function Step1({ data, set }: { data: FormData; set: (k: keyof FormData, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="md:col-span-2">
        <Label>Название кампании *</Label>
        <Input value={data.title} onChange={(v) => set("title", v)} placeholder="Например: Летняя коллекция 2025" />
      </div>
      <div>
        <Label>Ниша *</Label>
        <Select value={data.niche} onChange={(v) => set("niche", v)} options={NICHES.map((n) => ({ value: n, label: n }))} />
      </div>
      <div>
        <Label>Платформа *</Label>
        <Select value={data.platform} onChange={(v) => set("platform", v)} options={PLATFORMS} />
      </div>
      <div className="md:col-span-2">
        <Label>Цель кампании *</Label>
        <div className="flex flex-wrap gap-2">
          {GOALS.map((g) => (
            <button
              key={g.value}
              type="button"
              onClick={() => set("goal", g.value)}
              className={`text-xs px-3 py-2 rounded-lg border transition-colors ${
                data.goal === g.value
                  ? "bg-[#0064FF] border-[#0064FF] text-white"
                  : "border-white/[0.06] text-white/40 hover:text-white hover:border-white/20"
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>
      <div>
        <Label>Дата начала</Label>
        <Input type="date" value={data.startDate} onChange={(v) => set("startDate", v)} />
      </div>
      <div>
        <Label>Дата окончания</Label>
        <Input type="date" value={data.endDate} onChange={(v) => set("endDate", v)} />
      </div>
    </div>
  );
}

function Step2({ data, set, setArr }: { data: FormData; set: (k: keyof FormData, v: string) => void; setArr: (k: keyof FormData, v: string[]) => void }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div>
        <Label>Пол аудитории</Label>
        <Select
          value={data.targetGender}
          onChange={(v) => set("targetGender", v)}
          options={[
            { value: "all", label: "Любой" },
            { value: "male", label: "Мужчины" },
            { value: "female", label: "Женщины" },
          ]}
        />
      </div>
      <div>
        <Label>Возраст аудитории</Label>
        <div className="flex items-center gap-2">
          <Input value={data.targetAgeMin} onChange={(v) => set("targetAgeMin", v)} placeholder="от" />
          <span className="text-white/30 shrink-0">—</span>
          <Input value={data.targetAgeMax} onChange={(v) => set("targetAgeMax", v)} placeholder="до" />
        </div>
      </div>
      <div className="md:col-span-2">
        <Label>Города</Label>
        <PillToggle value={data.targetCities} options={CITIES} onChange={(v) => setArr("targetCities", v)} />
      </div>
      <div>
        <Label>Бюджет кампании (₸) *</Label>
        <Input value={data.budget} onChange={(v) => set("budget", v)} placeholder="500 000" />
      </div>
      <div>
        <Label>Количество блогеров</Label>
        <Input value={data.influencersCount} onChange={(v) => set("influencersCount", v)} placeholder="3–5" />
      </div>
    </div>
  );
}

function Step3({ data, set, setArr }: { data: FormData; set: (k: keyof FormData, v: string) => void; setArr: (k: keyof FormData, v: string[]) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <Label>Форматы контента *</Label>
        <PillToggle value={data.formats} options={FORMATS} onChange={(v) => setArr("formats", v)} />
      </div>
      <div>
        <Label>Тон коммуникации</Label>
        <PillToggle value={data.tone ? [data.tone] : []} options={TONES} onChange={(v) => set("tone", v[v.length - 1] || "")} />
      </div>
      <div>
        <Label>Требования к контенту</Label>
        <Textarea value={data.requirements} onChange={(v) => set("requirements", v)} placeholder="Опишите что должно быть в контенте: продукт, месседж, запрещённые темы..." rows={4} />
      </div>
      <div>
        <Label>Примеры понравившегося контента (ссылки)</Label>
        <Textarea value={data.examples} onChange={(v) => set("examples", v)} placeholder="https://..." rows={2} />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NewCampaignPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(DEFAULTS);

  const set = (k: keyof FormData, v: string) => setData((d) => ({ ...d, [k]: v }));
  const setArr = (k: keyof FormData, v: string[]) => setData((d) => ({ ...d, [k]: v }));

  const canNext = [
    data.title && data.niche && data.platform && data.goal,
    data.budget,
    data.formats.length > 0,
  ][step];

  const handleSubmit = () => {
    // In production: POST to API
    router.push("/app/campaigns");
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => step === 0 ? router.back() : setStep(step - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-white/[0.06] text-white/40 hover:text-white hover:border-white/20 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-white">Новая кампания</h1>
          <p className="text-xs text-white/40">Шаг {step + 1} из {STEPS.length}</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                i < step ? "bg-[#22C55E] text-white" : i === step ? "bg-[#0064FF] text-white" : "bg-white/[0.06] text-white/30"
              }`}>
                {i < step ? <Check className="w-3 h-3" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === step ? "text-white" : "text-white/30"}`}>{s}</span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-px mx-2 ${i < step ? "bg-[#22C55E]/40" : "bg-white/[0.06]"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Form card */}
      <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
        <h2 className="text-sm font-semibold text-white mb-5">{STEPS[step]}</h2>
        {step === 0 && <Step1 data={data} set={set} />}
        {step === 1 && <Step2 data={data} set={set} setArr={setArr} />}
        {step === 2 && <Step3 data={data} set={set} setArr={setArr} />}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => step === 0 ? router.back() : setStep(step - 1)}
          className="text-sm text-white/40 hover:text-white transition-colors"
        >
          {step === 0 ? "Отмена" : "Назад"}
        </button>
        <button
          onClick={() => step < STEPS.length - 1 ? setStep(step + 1) : handleSubmit()}
          disabled={!canNext}
          className="flex items-center gap-2 bg-[#0064FF] text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-[#0052CC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          {step < STEPS.length - 1 ? (
            <>Далее <ArrowRight className="w-4 h-4" /></>
          ) : (
            <>Создать кампанию <Check className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
}
