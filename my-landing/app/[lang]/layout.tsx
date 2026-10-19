import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import { siteConfig } from "@/site.config";
import { dirFor, getDictionary, hasLocale, locales } from "@/locales";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// Manrope has no Arabic glyphs, so Arabic text falls through to this font.
const plexArabic = IBM_Plex_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["500", "600", "700"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = await getDictionary(lang);
  const title = `${siteConfig.name} | ${meta.tagline}`;

  return {
    metadataBase: new URL(siteConfig.siteUrl),
    title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
    openGraph: {
      type: "website",
      siteName: siteConfig.name,
      title,
      description: meta.description,
      locale: meta.ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: meta.description,
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#433C78",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html
      lang={lang}
      dir={dirFor(lang)}
      className={`${manrope.variable} ${plexArabic.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
