import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import localFont from "next/font/local";
import ConditionalFooter from "@/app/components/ConditionalFooter";
import "./globals.css";

import ConditionalNavbar from "@/app/components/ConditionalNavbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const geistMono = localFont({
  src: "../../public/GeistMono-VariableFont_wght.ttf",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Arambh Advisory",
  description: "Business Growth & Startup Consulting",
};

import ScrollRevealProvider from "@/components/layout/ScrollRevealProvider";
import ClientMountLoader from "@/app/components/ClientMountLoader";
import { ScheduleCallProvider } from "@/components/schedule-call/ScheduleCallContext";
import ScheduleCallModal from "@/components/schedule-call/ScheduleCallModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={dmSans.className}>
        <ClientMountLoader>
          <ScheduleCallProvider>
            <ConditionalNavbar /> 
            <ScrollRevealProvider>{children}</ScrollRevealProvider>
            <ConditionalFooter />
            <ScheduleCallModal />
          </ScheduleCallProvider>
        </ClientMountLoader>
      </body>
    </html>
  );
}
