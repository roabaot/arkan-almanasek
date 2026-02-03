import { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { hasLocale } from "next-intl";
import "./globals.css";
import "flag-icons/css/flag-icons.min.css";
import { inter, spaceGrotesk } from "./fonts";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import AppShell from "../components/layout/AppShell";
import ThemeProvider from "../components/providers/ThemeProvider";

const APP_NAME = "MACS App";
const APP_DEFAULT_TITLE = "My Awesome MACS App";
const APP_TITLE_TEMPLATE = "%s - MACS App";
const APP_DESCRIPTION = "Best MACS app in the world!";

export const metadata: Metadata = {
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // Await the params promise

  // Validate that the incoming `locale` parameter is valid
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Provide all messages to the client
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider defaultTheme="light">
            <AppShell>{children}</AppShell>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
