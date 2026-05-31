import { MetadataRoute } from "next";
import { articles } from "@/lib/blog/articles";

const BASE_URL = "https://paisabatao.in";

// Use real dates — never use new Date() for static pages.
// Google stops trusting lastModified if it changes on every deploy.
const LAUNCH_DATE = new Date("2026-04-20");
const HRA_UPDATED  = new Date("2026-04-25"); // updated metro cities list
const PERF_UPDATED = new Date("2026-05-30"); // performance + accessibility pass

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    // ── Homepage — genuinely changes with new tools / content
    {
      url: BASE_URL,
      lastModified: PERF_UPDATED,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── High-value calculators
    {
      url: `${BASE_URL}/income-tax-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/gst-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/gst-invoice-generator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/emi-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sip-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/salary-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/hra-calculator`,
      lastModified: HRA_UPDATED,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/ppf-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/fd-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },

    // ── EMI sub-pages
    {
      url: `${BASE_URL}/home-loan-emi-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/car-loan-emi-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/personal-loan-emi-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/education-loan-emi-calculator`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Blog index
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(articles[0]?.publishedAt ?? LAUNCH_DATE),
      changeFrequency: "weekly",
      priority: 0.8,
    },

    // ── About / legal pages — rarely change
    {
      url: `${BASE_URL}/about`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms-of-use`,
      lastModified: LAUNCH_DATE,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.updatedAt ?? article.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...blogPages];
}
