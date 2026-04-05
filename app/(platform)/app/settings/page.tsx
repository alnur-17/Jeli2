"use client";

import { useState } from "react";
import { Save, Eye, EyeOff } from "lucide-react";

const TABS = ["Профиль", "Безопасность", "Подписка", "Команда", "Уведомления", "API"] as const;
type Tab = typeof TABS[number];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-white/40">{label}</label>
      {children}
    </div>
  );
}

function Input({ value, onChange, placeholder, type = "text" }: {
  value: string; onChange?: (v: string) => void; placeholder?: string; type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      placeholder={placeholder}
      className="bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors"
    />
  );
}

function SaveBtn({ onClick }: { onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-[#0064FF] text-white text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-[#0052CC] transition-colors w-fit"
    >
      <Save className="w-4 h-4" />
      Сохранить
    </button>
  );
}

// ─── Tab: Profile ─────────────────────────────────────────────────────────────

function ProfileTab() {
  const [form, setForm] = useState({
    company: "ТОО «Бренд KZ»", bin: "220401234567",
    email: "brand@example.kz", phone: "+7 705 123 45 67",
    website: "https://brand.kz", description: "",
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Название компании">
          <Input value={form.company} onChange={(v) => set("company", v)} />
        </Field>
        <Field label="БИН">
          <Input value={form.bin} onChange={(v) => set("bin", v)} />
        </Field>
        <Field label="Email">
          <Input value={form.email} onChange={(v) => set("email", v)} type="email" />
        </Field>
        <Field label="Телефон">
          <Input value={form.phone} onChange={(v) => set("phone", v)} />
        </Field>
        <Field label="Сайт">
          <Input value={form.website} onChange={(v) => set("website", v)} />
        </Field>
      </div>
      <Field label="Описание компании">
        <textarea
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          rows={3}
          placeholder="Расскажите о вашей компании..."
          className="bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20 transition-colors resize-none"
        />
      </Field>
      <SaveBtn />
    </div>
  );
}

// ─── Tab: Security ────────────────────────────────────────────────────────────

function SecurityTab() {
  const [show, setShow] = useState({ cur: false, nw: false, conf: false });
  const [form, setForm] = useState({ cur: "", nw: "", conf: "" });

  return (
    <div className="flex flex-col gap-5 max-w-md">
      <h3 className="text-sm font-semibold text-white">Сменить пароль</h3>
      {(["cur", "nw", "conf"] as const).map((k) => {
        const labels: Record<string, string> = { cur: "Текущий пароль", nw: "Новый пароль", conf: "Повторите пароль" };
        return (
          <Field key={k} label={labels[k]}>
            <div className="relative">
              <input
                type={show[k] ? "text" : "password"}
                value={form[k]}
                onChange={(e) => setForm((f) => ({ ...f, [k]: e.target.value }))}
                placeholder="••••••••"
                className="w-full bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-3 pr-10 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
              />
              <button
                type="button"
                onClick={() => setShow((s) => ({ ...s, [k]: !s[k] }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
              >
                {show[k] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </Field>
        );
      })}
      <SaveBtn />

      <div className="pt-4 border-t border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white mb-3">Двухфакторная аутентификация</h3>
        <div className="flex items-center justify-between bg-[#1a1a1a] border border-white/[0.06] rounded-xl px-4 py-3">
          <div>
            <p className="text-sm text-white">SMS-подтверждение</p>
            <p className="text-xs text-white/30">+7 705 *** ** 67</p>
          </div>
          <span className="text-xs text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-full">Включено</span>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Subscription ────────────────────────────────────────────────────────

const PLANS = [
  { id: "starter", name: "Старт",    price: "15 000", campaigns: 2,  ai: 10,  badge: "" },
  { id: "standard", name: "Стандарт", price: "45 000", campaigns: 5,  ai: 30,  badge: "Текущий" },
  { id: "pro",     name: "Про",      price: "90 000", campaigns: 15, ai: 100, badge: "Популярный" },
  { id: "agency",  name: "Агентство", price: "180 000", campaigns: -1, ai: -1, badge: "" },
];

function SubscriptionTab() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-white/40">Ваш тариф: <strong className="text-white">Стандарт</strong> · Истекает 12 апреля 2025</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PLANS.map((plan) => {
          const isActive = plan.id === "standard";
          return (
            <div key={plan.id} className={`bg-[#111] border rounded-xl p-5 flex flex-col gap-3 ${isActive ? "border-[#0064FF]/40" : "border-white/[0.06]"}`}>
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-white">{plan.name}</p>
                {plan.badge && (
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${isActive ? "bg-[#0064FF]/20 text-[#0064FF]" : "bg-[#EAB308]/10 text-[#EAB308]"}`}>
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-white">{plan.price} <span className="text-sm font-normal text-white/30">₸/мес</span></p>
              <div className="text-xs text-white/40 flex flex-col gap-1">
                <p>Кампании: {plan.campaigns < 0 ? "Безлимит" : plan.campaigns}</p>
                <p>ИИ-диалоги: {plan.ai < 0 ? "Безлимит" : `${plan.ai}/мес`}</p>
                <p>Поиск блогеров: Безлимит</p>
              </div>
              <button
                disabled={isActive}
                className={`text-sm font-medium py-2 rounded-lg transition-colors ${isActive ? "bg-[#0064FF]/10 text-[#0064FF] cursor-default" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"}`}
              >
                {isActive ? "Текущий тариф" : "Выбрать"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tab: Team ────────────────────────────────────────────────────────────────

const TEAM = [
  { name: "Айдос Сериков", email: "aidos@brand.kz", role: "Владелец",   color: "#0064FF" },
  { name: "Зарина Нурова", email: "zarina@brand.kz", role: "Менеджер",  color: "#7C3AED" },
];

function TeamTab() {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
        {TEAM.map((m) => (
          <div key={m.email} className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ background: m.color }}>
              {m.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{m.name}</p>
              <p className="text-xs text-white/30">{m.email}</p>
            </div>
            <span className="text-xs text-white/40 bg-white/[0.06] px-2.5 py-1 rounded-full">{m.role}</span>
          </div>
        ))}
      </div>
      <button className="flex items-center gap-2 text-sm text-[#0064FF] hover:underline w-fit">
        + Пригласить участника
      </button>
    </div>
  );
}

// ─── Tab: Notifications settings ─────────────────────────────────────────────

const NOTIF_PREFS = [
  { key: "publish", label: "Публикация контента",   desc: "Когда блогер публикует контент" },
  { key: "review",  label: "Черновик на проверке",  desc: "Блогер загрузил черновик" },
  { key: "payment", label: "Выплаты",               desc: "Успешные и неудачные транзакции" },
  { key: "system",  label: "Системные",             desc: "Подписка, безопасность" },
];

function NotifSettingsTab() {
  const [prefs, setPrefs] = useState<Record<string, { push: boolean; email: boolean }>>({
    publish: { push: true,  email: false },
    review:  { push: true,  email: true  },
    payment: { push: true,  email: true  },
    system:  { push: false, email: true  },
  });
  const toggle = (key: string, ch: "push" | "email") =>
    setPrefs((p) => ({ ...p, [key]: { ...p[key], [ch]: !p[key][ch] } }));

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
        <div className="grid grid-cols-[1fr_80px_80px] px-5 py-3 border-b border-white/[0.04] text-xs text-white/30">
          <span>Тип</span>
          <span className="text-center">Push</span>
          <span className="text-center">Email</span>
        </div>
        {NOTIF_PREFS.map((n) => (
          <div key={n.key} className="grid grid-cols-[1fr_80px_80px] items-center px-5 py-4 border-b border-white/[0.04] last:border-0">
            <div>
              <p className="text-sm text-white">{n.label}</p>
              <p className="text-xs text-white/30">{n.desc}</p>
            </div>
            {(["push", "email"] as const).map((ch) => (
              <div key={ch} className="flex justify-center">
                <button
                  onClick={() => toggle(n.key, ch)}
                  className={`w-9 h-5 rounded-full transition-colors relative ${prefs[n.key][ch] ? "bg-[#0064FF]" : "bg-white/10"}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefs[n.key][ch] ? "translate-x-4" : "translate-x-0.5"}`} />
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Tab: API ─────────────────────────────────────────────────────────────────

function APITab() {
  const [shown, setShown] = useState(false);
  const key = "jeli_live_sk_xxxxxxxxxxxxxxxxxxxxxxxxxxx";

  return (
    <div className="flex flex-col gap-5 max-w-lg">
      <div>
        <h3 className="text-sm font-semibold text-white mb-3">API ключ</h3>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm font-mono text-white/60 truncate">
            {shown ? key : key.replace(/[a-z]/g, "•")}
          </div>
          <button
            onClick={() => setShown(!shown)}
            className="shrink-0 text-white/30 hover:text-white transition-colors"
          >
            {shown ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
        <p className="text-xs text-white/20 mt-2">Не передавайте ключ третьим лицам</p>
      </div>
      <div className="flex gap-2">
        <button className="text-sm text-white bg-white/5 border border-white/[0.06] px-4 py-2 rounded-lg hover:bg-white/10 transition-colors">
          Скопировать
        </button>
        <button className="text-sm text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/20 px-4 py-2 rounded-lg hover:bg-[#EF4444]/20 transition-colors">
          Пересоздать ключ
        </button>
      </div>
      <div className="pt-4 border-t border-white/[0.06]">
        <h3 className="text-sm font-semibold text-white mb-2">Документация</h3>
        <p className="text-xs text-white/40">API позволяет интегрировать данные Jeli в ваши системы. Полная документация доступна для тарифов Про и Агентство.</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("Профиль");

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-5">
      <h1 className="text-xl font-semibold text-white">Настройки</h1>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#111] border border-white/[0.06] rounded-xl p-1 w-fit flex-wrap">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${tab === t ? "bg-[#0064FF] text-white font-medium" : "text-white/40 hover:text-white"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-6">
        {tab === "Профиль"       && <ProfileTab />}
        {tab === "Безопасность"  && <SecurityTab />}
        {tab === "Подписка"      && <SubscriptionTab />}
        {tab === "Команда"       && <TeamTab />}
        {tab === "Уведомления"   && <NotifSettingsTab />}
        {tab === "API"           && <APITab />}
      </div>
    </div>
  );
}
