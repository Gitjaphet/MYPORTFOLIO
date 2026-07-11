import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Header } from "@/components/layout/header";
import "./globals.css";
import { cn } from "@/lib/utils";
import { NavigationProgressProvider } from "@/components/providers/navigation-progress";
import { LoadingIndicator } from "@/components/layout/loading-indicator";

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Japhet Bezanaka | Portfolio",
  description: "Développeur Full-Stack, DevOps & consultant Odoo",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, playfair.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NavigationProgressProvider>
              <Header />
              <main className="pt-20">{children}</main>
              <LoadingIndicator />
            </NavigationProgressProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}