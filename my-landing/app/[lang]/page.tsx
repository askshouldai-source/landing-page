import Image from "next/image";
import { notFound } from "next/navigation";
import { siteConfig } from "@/site.config";
import { getDictionary, hasLocale, locales, type Dictionary } from "@/locales";
import { AppPreview } from "../components/AppPreview";
import { Reveal } from "../components/Reveal";
import { StoreBadges } from "../components/StoreBadges";
import { WaitlistForm } from "../components/WaitlistForm";

const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";

function Logo({ size = 40, alt }: { size?: number; alt: string }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-xl bg-white p-1 shadow-sm"
      style={{ width: size, height: size }}
    >
      <Image src="/logo.png" alt={alt} width={size} height={size} priority />
    </span>
  );
}

function Bubble({
  from,
  labels,
  children,
}: {
  from: string;
  labels: Dictionary["chat"];
  children: React.ReactNode;
}) {
  const me = from === "me";
  return (
    <div className={`flex ${me ? "justify-end" : "justify-start"}`}>
      <p
        className={`max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-snug ${
          me
            ? "rounded-ee-md bg-brand text-white"
            : "rounded-es-md bg-white text-ink shadow-sm ring-1 ring-black/5"
        }`}
      >
        <span className="sr-only">{me ? labels.you : labels.sadiq}</span>
        {children}
      </p>
    </div>
  );
}

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  className: "h-7 w-7",
};

const stepIcons = [
  <svg key="chat" {...iconProps}>
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    <path d="M8 12h.01M12 12h.01M16 12h.01" />
  </svg>,
  <svg key="target" {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>,
  <svg key="check" {...iconProps}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>,
];

const challengeIcons = [
  <svg key="moon" {...iconProps} className="h-6 w-6">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>,
  <svg key="eye-off" {...iconProps} className="h-6 w-6">
    <path d="M10.7 5.1A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.7 2.7" />
    <path d="M14.1 14.2a3 3 0 0 1-4.3-4.3" />
    <path d="M17.5 17.5A10.7 10.7 0 0 1 12 19c-7 0-10-7-10-7a13.2 13.2 0 0 1 4.5-5.5" />
    <path d="m2 2 20 20" />
  </svg>,
  <svg key="history" {...iconProps} className="h-6 w-6">
    <path d="M3 12a9 9 0 1 0 9-9 9.8 9.8 0 0 0-6.7 2.7L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </svg>,
];

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = await getDictionary(lang);
  const otherLocale = locales.find((l) => l !== lang)!;

  return (
    <>
      <Reveal />

      {/* 1. Hero */}
      <header id="top" className="hero on-dark relative overflow-clip text-white">
        <div aria-hidden="true" className="hero-q">
          {t.hero.questionMark}
        </div>

        <nav className={`${container} relative flex items-center justify-between gap-4 py-6`}>
          <a href="#top" className="flex items-center gap-3 text-xl font-extrabold tracking-tight">
            <Logo alt={t.nav.logoAlt} />
            ShouldAI
          </a>
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={`/${otherLocale}`}
              hrefLang={otherLocale}
              lang={otherLocale}
              aria-label={t.nav.switchLanguageLabel}
              className="rounded-full px-3 py-2 text-sm font-bold text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              {t.nav.switchLanguage}
            </a>
            <a
              href="#waitlist"
              className="rounded-full border border-white/30 px-4 py-2 text-sm font-bold transition hover:bg-white/10"
            >
              {t.nav.joinWaitlist}
            </a>
          </div>
        </nav>

        <div
          className={`${container} relative grid items-center gap-14 pt-10 pb-20 md:grid-cols-[1.15fr_1fr] md:pt-16 md:pb-28`}
        >
          <div className="fade-in">
            <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold text-white/85">
              {t.hero.eyebrow}
            </p>
            <h1 className="mt-6 text-5xl leading-[1.05] font-extrabold tracking-tight italic sm:text-6xl lg:text-7xl rtl:leading-[1.3] rtl:not-italic">
              {t.hero.titleLine1}
              <br />
              {t.hero.titleLine2}
            </h1>
            <p className="mt-6 text-xl font-bold text-white">{t.hero.lead}</p>
            <p className="mt-3 max-w-lg text-lg leading-relaxed text-white/80">{t.hero.body}</p>

            <div className="mt-9 flex flex-col gap-6">
              <a
                href="#waitlist"
                className="w-fit rounded-full bg-white px-7 py-4 font-extrabold text-brand shadow-lg transition hover:-translate-y-0.5"
              >
                {t.nav.joinWaitlist}
              </a>
              <StoreBadges t={t.stores} onDark />
              <p className="text-sm text-white/70">{t.hero.comingSoon}</p>
            </div>
          </div>

          <figure
            className="fade-in mx-auto w-full max-w-[300px] [animation-delay:200ms]"
            aria-label={t.hero.chatLabel}
          >
            <div className="rotate-[5deg] rounded-[2.4rem] bg-white/95 p-3 shadow-2xl shadow-black/40 rtl:-rotate-[5deg]">
              <div className="rounded-[1.9rem] bg-mist px-4 pt-5 pb-6 text-ink">
                <div className="flex items-center gap-3 border-b border-black/5 pb-4">
                  <Logo size={34} alt={t.nav.logoAlt} />
                  <div className="leading-tight">
                    <p className="font-extrabold">{t.hero.sadiqName}</p>
                    <p className="text-xs text-muted">{t.hero.sadiqRole}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3">
                  <Bubble from="me" labels={t.chat}>
                    {t.hero.userMessage}
                  </Bubble>
                  <Bubble from="sadiq" labels={t.chat}>
                    {t.hero.sadiqBefore}
                    <strong>{t.hero.sadiqAmount}</strong>
                    {t.hero.sadiqAfter}
                  </Bubble>
                  <div className="mt-2 flex flex-wrap justify-end gap-2" aria-hidden="true">
                    <span className="rounded-full border border-brand/30 px-3 py-1.5 text-xs font-bold text-brand">
                      {t.hero.chipSleep}
                    </span>
                    <span className="rounded-full border border-brand/30 px-3 py-1.5 text-xs font-bold text-brand">
                      {t.hero.chipOptions}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </figure>
        </div>
      </header>

      <main>
        {/* 2. The challenges */}
        <section aria-labelledby="challenges-title" className="py-20 md:py-28">
          <div className={`${container} grid items-center gap-12 md:grid-cols-2`}>
            <div data-reveal>
              <p className="text-sm font-extrabold tracking-widest text-berry uppercase">
                {t.challenges.eyebrow}
              </p>
              <h2 id="challenges-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.challenges.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{t.challenges.body1}</p>
              <p className="mt-4 text-lg leading-relaxed text-muted">{t.challenges.body2}</p>
            </div>

            <div data-reveal className="flex justify-center">
              <figure className="w-full max-w-sm rounded-3xl bg-ink p-7 text-white shadow-xl">
                <figcaption className="text-sm font-bold tracking-wide text-white/60">
                  {t.challenges.figureTitle}
                </figcaption>
                <ol className="mt-6 grid gap-3">
                  {t.challenges.items.map((item, i) => (
                    <li key={item.title} className="flex gap-4 rounded-2xl bg-white/10 p-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-white">
                        {challengeIcons[i]}
                      </span>
                      <div>
                        <p className="font-extrabold leading-snug">{item.title}</p>
                        <p className="mt-1 text-sm leading-relaxed text-white/70">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </figure>
            </div>
          </div>
        </section>

        {/* 3. How it works */}
        <section id="how" aria-labelledby="how-title" className="bg-mist py-20 md:py-28">
          <div className={container}>
            <div data-reveal className="max-w-2xl">
              <p className="text-sm font-extrabold tracking-widest text-berry uppercase">{t.how.eyebrow}</p>
              <h2 id="how-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.how.title}
              </h2>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {t.how.steps.map((step, i) => (
                <li
                  key={step.title}
                  data-reveal
                  style={{ transitionDelay: `${i * 100}ms` }}
                  className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-black/5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
                      {stepIcons[i]}
                    </span>
                    <span className="text-4xl font-extrabold text-brand/15" aria-hidden="true">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-extrabold leading-snug">
                    <span className="sr-only">{t.how.stepLabel.replace("{n}", String(i + 1))}</span>
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* 4. Meet Sadiq */}
        <section id="sadiq" aria-labelledby="sadiq-title" className="py-20 md:py-28">
          <div className={`${container} grid items-center gap-12 md:grid-cols-2`}>
            <div data-reveal>
              <p className="text-sm font-extrabold tracking-widest text-berry uppercase">{t.sadiq.eyebrow}</p>
              <h2 id="sadiq-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.sadiq.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{t.sadiq.body}</p>
            </div>

            <div data-reveal className="rounded-3xl bg-mist p-6 sm:p-8">
              <div className="grid gap-3" aria-label={t.sadiq.chatLabel} role="group">
                {t.sadiq.messages.map((m) => (
                  <Bubble key={m.text} from={m.from} labels={t.chat}>
                    {m.text}
                  </Bubble>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Inside the app */}
        <AppPreview t={t.app} />

        {/* 6. Waitlist */}
        <section id="waitlist" aria-labelledby="waitlist-title" className="bg-mist py-20 md:py-28">
          <div className={`${container} grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start`}>
            <div data-reveal>
              <p className="text-sm font-extrabold tracking-widest text-berry uppercase">
                {t.waitlist.eyebrow}
              </p>
              <h2 id="waitlist-title" className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
                {t.waitlist.title}
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-muted">{t.waitlist.body}</p>
              <div className="mt-10">
                <StoreBadges t={t.stores} />
                <p className="mt-4 text-sm text-muted">{t.waitlist.comingSoon}</p>
              </div>
            </div>

            <div data-reveal className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 sm:p-9">
              <WaitlistForm t={t.form} locale={lang} />
            </div>
          </div>
        </section>
      </main>

      {/* 7. Footer */}
      <footer className="on-dark bg-ink py-12 text-white/75">
        <div className={`${container} flex flex-col gap-8 md:flex-row md:items-start md:justify-between`}>
          <div>
            <p className="flex items-center gap-3 text-lg font-extrabold text-white">
              <Logo size={32} alt={t.nav.logoAlt} />
              ShouldAI
            </p>
            <p className="mt-3 italic rtl:not-italic">{t.meta.tagline}</p>
          </div>
          <ul className="flex flex-col gap-3 text-sm md:items-end">
            <li>
              <a
                href={`https://instagram.com/${siteConfig.instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-white underline-offset-4 hover:underline"
              >
                {t.footer.instagram}: <bdi>@{siteConfig.instagramHandle}</bdi>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="font-bold text-white underline-offset-4 hover:underline"
              >
                <bdi>{siteConfig.contactEmail}</bdi>
              </a>
            </li>
          </ul>
        </div>
        <div className={`${container} mt-10 border-t border-white/10 pt-6 text-sm`}>
          <p>{t.footer.disclaimer}</p>
          <p className="mt-2">© ShouldAI</p>
        </div>
      </footer>
    </>
  );
}
