import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Stars from "@/components/Stars";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });

export const metadata: Metadata = {
  title: "Asteria",
  description: "Learn astronomy through interactive lessons, quick checks and progress tracking.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} font-sans`}>
        <Stars />
        <div className="mx-auto min-h-dvh w-full max-w-6xl px-6 py-6 md:px-10 md:py-8">{children}</div>
      </body>
    </html>
  );
}
