import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug } from "@/lib/blog/articles";
import type { Article } from "@/lib/blog/articles";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article Not Found | CalcBharat" };
  }
  return {
    title: `${article.title} | CalcBharat`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
    },
  };
}

const categoryStyles: Record<Article["category"], string> = {
  Tax: "bg-indigo-100 text-indigo-700",
  Loans: "bg-orange-100 text-orange-700",
  Investment: "bg-emerald-100 text-emerald-700",
  GST: "bg-blue-100 text-blue-700",
  Salary: "bg-purple-100 text-purple-700",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const relatedCalc: Record<string, { label: string; href: string }> = {
  "new-vs-old-tax-regime-2025": {
    label: "Income Tax Calculator",
    href: "/income-tax-calculator",
  },
  "home-loan-emi-tips": {
    label: "Home Loan EMI Calculator",
    href: "/home-loan-emi-calculator",
  },
  "sip-vs-lumpsum": { label: "SIP Calculator", href: "/sip-calculator" },
  "gst-for-freelancers": {
    label: "GST Calculator",
    href: "/gst-calculator",
  },
  "hra-exemption-guide": {
    label: "HRA Calculator",
    href: "/hra-calculator",
  },
  "ppf-vs-elss": { label: "PPF Calculator", href: "/ppf-calculator" },
};

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) {
    notFound();
  }

  const calc = relatedCalc[article.slug];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 font-medium mb-6 transition-colors"
        >
          ← Back to Articles
        </Link>

        {/* Category badge */}
        <div className="mb-4">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${categoryStyles[article.category]}`}
          >
            {article.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-4">
          {article.title}
        </h1>

        {/* Meta line */}
        <p className="text-sm text-gray-500 mb-8">
          {article.readTime}
          {" · "}
          Published: {formatDate(article.publishedAt)}
          {article.updatedAt && (
            <> · Updated: {formatDate(article.updatedAt)}</>
          )}
        </p>

        {/* Content sections */}
        <div>
          {article.content.map((section, idx) => (
            <div key={idx}>
              {section.heading && (
                <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-2">
                  {section.heading}
                </h2>
              )}
              {section.paragraphs.map((para, pIdx) => (
                <p
                  key={pIdx}
                  className="text-gray-700 leading-relaxed mb-3"
                >
                  {para}
                </p>
              ))}
              {section.bullets && section.bullets.length > 0 && (
                <ul className="list-disc list-inside mb-4 space-y-1">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="text-gray-600 leading-relaxed">
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* Related calculator card */}
        {calc && (
          <div className="mt-12 rounded-2xl border border-brand-100 bg-brand-50 p-6">
            <p className="text-sm font-semibold text-brand-700 uppercase tracking-wide mb-2">
              Related Tool
            </p>
            <Link
              href={calc.href}
              className="inline-flex items-center gap-2 text-brand-600 font-semibold text-lg hover:text-brand-700 transition-colors"
            >
              Try the {calc.label} →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
