// Edit this file to go live. Everything the landing page links to lives here.
export const siteConfig = {
  // Page copy (tagline, description, every heading) lives in locales/en.json and locales/ar.json.
  name: "ShouldAI",

  // Public URL of the deployed site (used for Open Graph links).
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // Store links. Leave empty ("") to show the disabled "Coming soon" badge.
  // Paste a real URL and the badge becomes an active link automatically.
  appStoreUrl: "",
  playStoreUrl: "",

  // Waitlist backend: create a free form at https://formspree.io and paste
  // its endpoint here, e.g. "https://formspree.io/f/abcdwxyz".
  // Submissions can be exported as CSV from the Formspree dashboard.
  waitlistEndpoint: process.env.NEXT_PUBLIC_WAITLIST_ENDPOINT ?? "https://formspree.io/f/xgaoqqjp",

  instagramHandle: "shouldai.qa",
  contactEmail: "askshouldai@gmail.com",
};
