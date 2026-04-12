import Link from "next/link";
import type { Article } from "@/lib/blog/articles";

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

interface BlogCardProps {
  article: Article;
}

export default function BlogCard({ article }: BlogCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800/60 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col overflow-hidden">
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${categoryStyles[article.category]}`}
          >
            {article.category}
          </span>
          <span className="text-xs text-gray-400">{article.readTime}</span>
        </div>

        <h2 className="text-gray-900 dark:text-gray-100 font-semibold text-base leading-snug mb-2 line-clamp-2">
          {article.title}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700/50">
          <span className="text-xs text-gray-400">
            {formatDate(article.publishedAt)}
          </span>
          <Link
            href={`/blog/${article.slug}`}
            className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            Read article →
          </Link>
        </div>
      </div>
    </article>
  );
}
