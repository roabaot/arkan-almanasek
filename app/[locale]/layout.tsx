import { ReactNode } from "react";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";
import { inter, spaceGrotesk } from "./fonts";
import ClientLayout from "./components/common/ClientLayout";
import { notFound } from "next/navigation";
import { routing } from "../../i18n/routing";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";

export const metadata: Metadata = {
  title: "Putech – Business & IT Solutions Next.js Template",
  description:
    "Putech is a sleek, modern, and fully responsive Next.js template for IT companies, startups, software agencies, and business service providers. Built with Next.js and Tailwind CSS.",
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
  if (!routing.locales.includes(locale as "ar" | "en")) {
    notFound();
  }

  // Provide all messages to the client
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          {children}
          <Footer />
          {/* All client-side extras are isolated */}
          <ClientLayout />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
