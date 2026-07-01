import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Vikas Bhatt Classes | Best Coaching Institute in Burari, Delhi",
    template: "%s | Vikas Bhatt Classes"
  },
  description: "Vikas Bhatt Classes (VBC) offers premium academic coaching for Class 1 to 12 (Science, Commerce, Arts), JEE, NEET, B.Com, and Olympiads in Sant Nagar, Burari, Delhi. Build a strong foundation with Vikas Bhatt.",
  keywords: ["Vikas Bhatt Classes", "Coaching Institute in Burari", "Class 1 to 12 Tuition", "JEE NEET Coaching Delhi", "B.Com Classes Burari", "Vikas Bhatt Burari"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}