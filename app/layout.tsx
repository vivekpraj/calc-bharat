import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NavigationProgress from "@/components/NavigationProgress";
import DisclaimerModal from "@/components/DisclaimerModal";
import Script from "next/script";
import JsonLd from "@/components/JsonLd";

const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://paisabatao.in/#org",
      name: "PaisaBatao",
      url: "https://paisabatao.in",
      logo: "https://paisabatao.in/icon.svg",
      description: "Free Indian financial calculators for GST, EMI, SIP, Income Tax, HRA, PPF, FD and salary.",
    },
    {
      "@type": "WebSite",
      "@id": "https://paisabatao.in/#website",
      name: "PaisaBatao",
      url: "https://paisabatao.in",
      publisher: { "@id": "https://paisabatao.in/#org" },
      potentialAction: {
        "@type": "SearchAction",
        target: "https://paisabatao.in/blog?q={search_term_string}",
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://paisabatao.in"),
  title: {
    default: "PaisaBatao — Free Indian Financial Calculators",
    template: "%s | PaisaBatao",
  },
  description:
    "Free GST, EMI, SIP, Income Tax, HRA calculators for India. Fast, accurate, no login required.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "PaisaBatao",
  },
  alternates: { canonical: "https://paisabatao.in" },
  robots: { index: true, follow: true },
  verification: {
    other: { "msvalidate.01": "0B0217E37CE3203913E63D87FC41E14F" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.className}>
      <body className="bg-[#F7F8FC] min-h-screen flex flex-col">
        <JsonLd data={siteSchema} />
        <NavigationProgress />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <DisclaimerModal />
        {/* Google Analytics 4 — lazyOnload */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="lazyOnload"
        />
        <Script id="ga4" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX');
        `}</Script>
      </body>
    </html>
  );
}
