import "../global.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Providers } from "./provider";

export const metadata: Metadata = {
  title: {
    default: "Chat bot",
    template: "%s | https://chatbot.vn",
  },
  description: "Chat bot",
  openGraph: {
    title: "https://chatbot.vn",
    description: "Chat bot",
    url: "https://chatbot.vn",
    siteName: "https://chatbot.vn",
    images: [
      {
        url: "https://chatbot.vn/favicon.png",
        width: 1200,
        height: 630,
        alt: "Chat bot",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Chat bot",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const calSans = localFont({
  src: "../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
      <head>{/* <Analytics /> */}</head>
      <body
        className={`bg-black ${
          process.env.NODE_ENV === "development" ? "debug-screens" : ""
        }`}
      >
        <Providers>{children}</Providers>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
