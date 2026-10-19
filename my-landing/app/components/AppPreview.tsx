import Image from "next/image";
import type { Dictionary } from "@/locales";

// Coded recreation of the app's Home screen, so it stays crisp and translates with the page.
const budget = 5000;
const spent = 1496;
const goal = 1000;
const saved = 810;
const categories = [
  { amount: 752, color: "#433c78" },
  { amount: 450, color: "#c0596a" },
  { amount: 289, color: "#6a5fae" },
  { amount: 5, color: "#7a2e45" },
];

const icon = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const tabIcons = [
  <path key="home" d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1Z" />,
  <path key="wallet" d="M4 6h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4Zm0 0V5a1 1 0 0 1 1-1h11M15 13h2" />,
  <path key="receipt" d="M6 3h12v18l-3-2-3 2-3-2-3 2Zm3 5h6m-6 4h6m-6 4h3" />,
  <path key="sparkles" d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9ZM19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />,
  <path key="heart" d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />,
];

function donut() {
  const total = categories.reduce((sum, c) => sum + c.amount, 0);
  let at = 0;
  const stops = categories.map((c) => {
    const from = at;
    at += (c.amount / total) * 360;
    return `${c.color} ${from}deg ${at - 1.5}deg, white ${at - 1.5}deg ${at}deg`;
  });
  return `conic-gradient(${stops.join(", ")})`;
}

export function AppPreview({ t }: { t: Dictionary["app"] }) {
  const money = (n: number) => t.money.replace("{n}", n.toLocaleString("en-US"));
  const label = "text-[9px] font-extrabold tracking-widest text-muted uppercase";
  const card = "rounded-2xl bg-white p-3 ring-1 ring-black/8";

  return (
    <section id="app" aria-labelledby="app-title" className="on-dark bg-brand-deep py-20 text-white md:py-28">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 sm:px-8 md:grid-cols-[1fr_1.05fr]">
        <div data-reveal>
          <p className="text-sm font-extrabold tracking-widest text-white/60 uppercase">{t.eyebrow}</p>
          <h2 id="app-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {t.title}
          </h2>
          <ul className="mt-10 grid gap-7 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            {t.features.map((f) => (
              <li key={f.title} className="border-s-2 border-berry ps-4">
                <h3 className="font-extrabold">{f.title}</h3>
                <p className="mt-1.5 leading-relaxed text-white/70">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="flex justify-center">
          <div
            role="img"
            aria-label={t.mockupLabel}
            className="w-full max-w-[340px] rounded-[2.6rem] bg-white/95 p-2.5 shadow-2xl shadow-black/50"
          >
            <div aria-hidden="true" className="overflow-hidden rounded-[2.1rem] bg-white text-ink">
              {/* Header */}
              <div className="flex items-center gap-3 border-b border-black/8 px-4 pt-6 pb-4">
                <Image src="/logo.png" alt="" width={34} height={34} />
                <div className="leading-tight">
                  <p className="text-[15px] font-extrabold">{t.greeting}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{t.bank}</p>
                </div>
                <svg {...icon} className="ms-auto h-5 w-5">
                  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0" />
                </svg>
              </div>

              <div className="grid gap-3 bg-white px-3 pt-3 pb-4">
                {/* Budget + goal */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className={card}>
                    <p className={label}>{t.thisMonth}</p>
                    <p className="mt-1.5 text-lg font-extrabold">{money(spent)}</p>
                    <p className="text-[10px] leading-snug text-muted">
                      {t.spentOf.replace("{budget}", money(budget))}
                    </p>
                    <div className="mt-2.5 h-1.5 rounded-full bg-mist">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-brand to-berry rtl:bg-linear-to-l"
                        style={{ width: `${(spent / budget) * 100}%` }}
                      />
                    </div>
                    <p className="mt-2 text-[10px] leading-snug text-muted">
                      {t.monthFooter.replace("{amount}", money(budget - spent))}
                    </p>
                  </div>
                  <div className={card}>
                    <p className={label}>{t.savingsGoal}</p>
                    <p className="mt-1.5 text-lg font-extrabold">{money(goal)}</p>
                    <p className="text-[10px] leading-snug text-muted">
                      {t.protectedOf.replace("{goal}", money(goal))}
                    </p>
                    <div className="mt-2.5 h-1.5 rounded-full bg-[#c0596a]" />
                    <p className="mt-2 text-[10px] leading-snug text-muted">{t.goalFooter}</p>
                  </div>
                </div>

                {/* Sadiq Savings */}
                <div className="flex items-center gap-3 rounded-full border border-[#c0596a] bg-[#f6e8eb] px-4 py-2.5">
                  <svg {...icon} className="h-5 w-5 shrink-0 text-[#c0596a]">
                    <path d="M19 9c1 0 2 .5 2 2v2h-2c-.5 1.5-1.5 2.5-3 3v3h-3v-2h-3v2H7v-3.5A6 6 0 0 1 10 6h5l3-2v4Z" />
                  </svg>
                  <div className="leading-tight">
                    <p className="text-[13px] font-extrabold">{t.saved.replace("{amount}", money(saved))}</p>
                    <p className="text-[10px] text-muted">{t.savedSub}</p>
                  </div>
                </div>

                {/* Spending by category */}
                <div className={card}>
                  <p className={label}>{t.byCategory}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 rounded-full" style={{ background: donut() }}>
                      <div className="absolute inset-[22%] rounded-full bg-white" />
                    </div>
                    <ul className="grid flex-1 gap-1.5 text-[11px]">
                      {categories.map((c, i) => (
                        <li key={c.color} className="flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                          <span className="font-semibold">{t.categories[i]}</span>
                          <span className="ms-auto font-bold text-muted">{money(c.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spending patterns */}
                <div className={card}>
                  <p className={label}>{t.patterns}</p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mist text-brand">
                      <svg {...icon} className="h-4 w-4" fill="currentColor">
                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                      </svg>
                    </span>
                    <div className="leading-tight">
                      <p className="text-[12px] font-extrabold">{t.lateNight}</p>
                      <p className="text-[10px] text-muted">{t.lateNightHours}</p>
                    </div>
                    <div className="ms-auto text-end leading-tight">
                      <p className="text-[12px] font-extrabold">0%</p>
                      <p className="text-[10px] text-muted">{money(0)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tab bar */}
              <div className="grid grid-cols-5 border-t border-black/8 px-1 pt-2.5 pb-4">
                {t.tabs.map((tab, i) => (
                  <div
                    key={tab}
                    className={`flex flex-col items-center gap-1 text-[9px] font-bold ${i === 0 ? "text-brand" : "text-muted"}`}
                  >
                    <svg {...icon} className="h-5 w-5" fill={i === 0 ? "currentColor" : "none"}>
                      {tabIcons[i]}
                    </svg>
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
