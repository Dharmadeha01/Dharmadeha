import type { Metadata } from "next";
import { DM_Serif_Display, DM_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";

const dmSerifDisplay = DM_Serif_Display({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-dm-serif",
  display: "swap",
});

const dmSans = DM_Sans({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error — DM Sans supports cyrillic; next/font types are behind
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  variable: "--font-dm-sans",
  display: "swap",
});


export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://dharmadeha.vercel.app";
  const url = `${baseUrl}/${locale}`;
  const imageUrl = `${baseUrl}/og-image.jpg`;

  return {
    title: "DharmaDeha — No one walks the path alone",
    description:
      "Meditation mentorship circles for people who want community on the spiritual path.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      url,
      siteName: "DharmaDeha",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "DharmaDeha — No one walks the path alone",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: [imageUrl],
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/apple-touch-icon.svg",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${dmSerifDisplay.variable} ${dmSans.variable} antialiased`}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
