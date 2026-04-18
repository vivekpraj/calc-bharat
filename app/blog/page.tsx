import type { Metadata } from "next";
import { articles } from "@/lib/blog/articles";
import BlogArticles from "./BlogArticles";

export const metadata: Metadata = {
  title: "Financial Insights & Articles | PaisaBatao",
  description:
    "Expert guides on Indian income tax, home loans, SIP investing, GST compliance, and salary planning. Stay informed with PaisaBatao's financial articles.",
  openGraph: {
    title: "Financial Insights & Articles | PaisaBatao",
    description:
      "Expert guides on Indian income tax, home loans, SIP investing, GST compliance, and salary planning.",
    type: "website",
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-2xl">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Financial Insights
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              Guides to Help You Make{" "}
              <span className="text-brand-600">Smarter Money Decisions</span>
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Plain-language articles on Indian income tax, home loans, mutual
              fund investing, GST, and salary planning — written for everyday
              Indians.
            </p>
          </div>
        </div>
      </section>

      {/* Articles section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <BlogArticles articles={articles} />
      </section>
    </main>
  );
}
