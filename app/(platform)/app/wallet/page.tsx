"use client";

import { useState } from "react";
import { Plus, ArrowDownLeft, ArrowUpRight, Clock, X, CreditCard, Smartphone } from "lucide-react";
import { MOCK_TRANSACTIONS, MOCK_DASHBOARD } from "@/lib/mock-data";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function fmtMoney(n: number, sign = false) {
  const abs = Math.abs(n).toLocaleString("ru-KZ");
  if (sign) return `${n > 0 ? "+" : "−"}${abs} ₸`;
  return `${abs} ₸`;
}

const TX_ICONS: Record<string, React.ReactNode> = {
  deposit:    <ArrowDownLeft className="w-3.5 h-3.5 text-[#22C55E]" />,
  payment:    <ArrowUpRight  className="w-3.5 h-3.5 text-[#EF4444]" />,
  commission: <ArrowUpRight  className="w-3.5 h-3.5 text-[#EF4444]" />,
  freeze:     <Clock         className="w-3.5 h-3.5 text-[#EAB308]" />,
};

const TX_TYPE_LABEL: Record<string, string> = {
  deposit: "Пополнение", payment: "Выплата", commission: "Комиссия", freeze: "Заморозка",
};

// ─── Top-up Modal ─────────────────────────────────────────────────────────────

function TopUpModal({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState<"kaspi" | "card" | "freedom">("kaspi");
  const presets = [50000, 100000, 250000, 500000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#111] border border-white/[0.08] rounded-2xl p-6 w-full max-w-sm flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-white">Пополнить кошелёк</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Amount */}
        <div>
          <label className="text-xs text-white/40 mb-2 block">Сумма (₸)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            className="w-full bg-[#1a1a1a] border border-white/[0.06] rounded-xl px-4 py-3 text-lg font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-white/20"
          />
          <div className="flex gap-2 mt-2.5">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setAmount(String(p))}
                className={`flex-1 text-xs py-1.5 rounded-lg border transition-colors ${
                  amount === String(p)
                    ? "bg-[#0064FF] border-[#0064FF] text-white"
                    : "border-white/[0.06] text-white/40 hover:text-white hover:border-white/20"
                }`}
              >
                {p >= 1000 ? `${p / 1000}K` : p}
              </button>
            ))}
          </div>
        </div>

        {/* Method */}
        <div>
          <label className="text-xs text-white/40 mb-2 block">Способ оплаты</label>
          <div className="flex flex-col gap-2">
            {[
              { id: "kaspi",   label: "Kaspi.kz",    sub: "Быстро через Kaspi", icon: <Smartphone className="w-4 h-4" /> },
              { id: "card",    label: "Банковская карта", sub: "Visa / Mastercard", icon: <CreditCard className="w-4 h-4" /> },
              { id: "freedom", label: "Freedom Pay",  sub: "Онлайн-платёж", icon: <CreditCard className="w-4 h-4" /> },
            ].map(({ id, label, sub, icon }) => (
              <button
                key={id}
                onClick={() => setMethod(id as typeof method)}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-colors text-left ${
                  method === id
                    ? "border-[#0064FF] bg-[#0064FF]/5"
                    : "border-white/[0.06] hover:border-white/20"
                }`}
              >
                <span className={method === id ? "text-[#0064FF]" : "text-white/30"}>{icon}</span>
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-[11px] text-white/30">{sub}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <button
          disabled={!amount || Number(amount) <= 0}
          className="bg-[#0064FF] text-white font-semibold text-sm rounded-xl py-3 hover:bg-[#0052CC] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Пополнить {amount ? fmtMoney(Number(amount)) : ""}
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WalletPage() {
  const [showTopUp, setShowTopUp] = useState(false);
  const { walletBalance, frozenBalance } = MOCK_DASHBOARD;
  const available = walletBalance - frozenBalance;

  return (
    <>
      {showTopUp && <TopUpModal onClose={() => setShowTopUp(false)} />}

      <div className="flex flex-col gap-5 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-white">Кошелёк</h1>
          <button
            onClick={() => setShowTopUp(true)}
            className="flex items-center gap-2 bg-[#0064FF] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-[#0052CC] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Пополнить
          </button>
        </div>

        {/* Balance cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="md:col-span-1 bg-[#0064FF] rounded-2xl p-5 flex flex-col gap-3">
            <p className="text-xs text-white/70">Доступный баланс</p>
            <p className="text-3xl font-bold text-white">{fmtMoney(available)}</p>
            <button
              onClick={() => setShowTopUp(true)}
              className="mt-auto flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors text-white text-xs font-medium px-3 py-2 rounded-lg w-fit"
            >
              <Plus className="w-3.5 h-3.5" />
              Пополнить
            </button>
          </div>
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/30 mb-2">Заморожено</p>
            <p className="text-2xl font-bold text-[#EAB308]">{fmtMoney(frozenBalance)}</p>
            <p className="text-[11px] text-white/20 mt-2">Под активные кампании</p>
          </div>
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-5">
            <p className="text-xs text-white/30 mb-2">Общий баланс</p>
            <p className="text-2xl font-bold text-white">{fmtMoney(walletBalance)}</p>
            <p className="text-[11px] text-white/20 mt-2">Доступно + заморожено</p>
          </div>
        </div>

        {/* Subscription */}
        <div className="bg-[#111] border border-white/[0.06] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Подписка</h2>
            <span className="flex items-center gap-1.5 text-xs text-[#22C55E] bg-[#22C55E]/10 px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" />
              Активна
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-base font-semibold text-white">Стандарт</p>
              <p className="text-xs text-white/40 mt-0.5">Истекает 12 апреля 2025</p>
            </div>
            <div className="text-right">
              <p className="text-base font-semibold text-white">45 000 ₸/мес</p>
              <button className="text-xs text-[#0064FF] hover:underline mt-0.5">Сменить тариф</button>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/[0.04] grid grid-cols-3 gap-3 text-center">
            {[
              { label: "Кампании", value: "5" },
              { label: "ИИ-диалоги", value: "30/мес" },
              { label: "Блогеры", value: "Безлимит" },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-white">{value}</p>
                <p className="text-[10px] text-white/30">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-[#111] border border-white/[0.06] rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white">История операций</h2>
          </div>
          <div className="divide-y divide-white/[0.04]">
            {MOCK_TRANSACTIONS.map((tx) => (
              <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  tx.type === "deposit" ? "bg-[#22C55E]/10" : tx.type === "freeze" ? "bg-[#EAB308]/10" : "bg-[#EF4444]/10"
                }`}>
                  {TX_ICONS[tx.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{tx.description}</p>
                  <p className="text-[11px] text-white/30">
                    {TX_TYPE_LABEL[tx.type]}
                    {tx.campaign && ` · ${tx.campaign}`}
                    {" · "}{tx.date}
                  </p>
                </div>
                <span className={`text-sm font-semibold shrink-0 ${tx.amount > 0 ? "text-[#22C55E]" : "text-white"}`}>
                  {fmtMoney(tx.amount, true)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
