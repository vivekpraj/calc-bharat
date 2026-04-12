"use client";

import { useState } from "react";
import type { Article } from "@/lib/blog/articles";
import BlogCard from "@/components/BlogCard";

type Category = Article["category"];
type Filter = Category | "All";

const ALL_CATEGORIES: Category[] = [
  "Tax",
  "Loans",
  "Investment",
  "GST",
  "Salary",
];

const filterButtonBase =
  "px-4 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 border";

const activeStyle =
  "bg-brand-600 text-white border-brand-600";

const inactiveStyle =
  "bg-white text-gray-600 border-gray-200 hover:border-brand-400 hover:text-brand-600";

interface BlogArticlesProps {
  articles: Article[];
}

export default function BlogArticles({ articles }: BlogArticlesProps) {
  const [active, setActive] = useState<Filter>("All");

  const filtered =
    active === "All" ? articles : articles.filter((a) => a.category === active);

  return (
    <section>
      {/* Category filter chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActive("All")}
          className={`${filterButtonBase} ${active === "All" ? activeStyle : inactiveStyle}`}
        >
          All
        </button>
        {ALL_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`${filterButtonBase} ${active === cat ? activeStyle : inactiveStyle}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article grid */}
      {filtered.length === 0 ? (
        <p className="text-gray-500 text-sm">No articles in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((article) => (
            <BlogCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
