import { siteConfig } from "@/site.config";
import type { Dictionary } from "@/locales";

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7 fill-current">
      <path d="M16.37 12.6c-.02-2.3 1.88-3.4 1.96-3.46-1.07-1.56-2.73-1.77-3.32-1.8-1.41-.14-2.76.83-3.48.83-.72 0-1.82-.81-3-.79-1.54.02-2.96.9-3.76 2.28-1.6 2.78-.41 6.9 1.15 9.16.76 1.1 1.67 2.34 2.86 2.3 1.15-.05 1.58-.74 2.97-.74 1.38 0 1.77.74 2.98.72 1.24-.02 2.02-1.12 2.77-2.23.87-1.28 1.23-2.52 1.25-2.58-.03-.01-2.4-.92-2.38-3.69zM14.1 5.86c.63-.77 1.06-1.83.94-2.9-.91.04-2.02.61-2.67 1.37-.58.67-1.1 1.76-.96 2.8 1.02.08 2.06-.52 2.69-1.27z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6">
      <path fill="#00D7FE" d="M3.6 1.8c-.3.3-.4.8-.4 1.4v17.6c0 .6.2 1.1.4 1.4l.1.1 9.9-9.9v-.2L3.7 1.7z" />
      <path fill="#FFCE00" d="m16.9 15.6-3.3-3.3v-.2l3.3-3.3.1.1 3.9 2.2c1.1.6 1.1 1.7 0 2.3L17 15.6z" />
      <path fill="#FF3A44" d="m17 15.5-3.4-3.4-10 10c.4.4 1 .4 1.7.1L17 15.5" />
      <path fill="#00F076" d="M17 8.8 5.3 2.2c-.7-.4-1.3-.3-1.7.1l10 9.9z" />
    </svg>
  );
}

type Store = {
  key: string;
  url: string;
  small: string;
  big: string;
  icon: React.ReactNode;
};

const stores = (t: Dictionary["stores"]): Store[] => [
  {
    key: "apple",
    url: siteConfig.appStoreUrl,
    small: t.appleSmall,
    big: t.appleBig,
    icon: <AppleIcon />,
  },
  {
    key: "google",
    url: siteConfig.playStoreUrl,
    small: t.googleSmall,
    big: t.googleBig,
    icon: <PlayIcon />,
  },
];

export function StoreBadges({ t, onDark = false }: { t: Dictionary["stores"]; onDark?: boolean }) {
  const border = onDark ? "border-white/30" : "border-black/10";

  return (
    <ul className="flex flex-wrap gap-4">
      {stores(t).map((store) => {
        const body = (
          <>
            {store.icon}
            <span className="flex flex-col leading-none text-start">
              <span className="text-[11px] font-medium tracking-wide">{store.small}</span>
              <span className="mt-1 text-[19px] font-bold tracking-tight">{store.big}</span>
            </span>
          </>
        );
        const base = `flex h-14 min-w-[164px] items-center gap-3 rounded-xl border bg-black px-4 text-white ${border}`;

        return (
          <li key={store.key} className="relative">
            {store.url ? (
              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${base} transition-transform hover:-translate-y-0.5`}
              >
                {body}
              </a>
            ) : (
              <div className={`${base} cursor-not-allowed`} title={t.comingSoon}>
                <span className="flex items-center gap-3 opacity-55">{body}</span>
                <span className="absolute -top-2.5 -end-2 rounded-full bg-berry px-2.5 py-1 text-[10px] font-extrabold tracking-wider text-white uppercase shadow-md">
                  {t.comingSoon}
                </span>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
