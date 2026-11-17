import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://wedding-invitation-nico-tise.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: "The Wedding of Nico & Tise",

  description:
    "Dengan penuh kasih, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada pernikahan Nico & Tise.",

  openGraph: {
    title: "The Wedding of Nico & Tise",
    description:
      "Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.",
    url: siteUrl,
    siteName: "The Wedding of Nico & Tise",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 630,
        height: 1200,
        alt: "The Wedding of Nico & Tise",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "The Wedding of Nico & Tise",
    description: "The Wedding of Nico & Tise",
    images: ["/og-image.jpeg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}