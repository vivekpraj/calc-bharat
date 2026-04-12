export interface Section {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  category: "Tax" | "Loans" | "Investment" | "GST" | "Salary";
  readTime: string;
  publishedAt: string;
  updatedAt?: string;
  content: Section[];
}

export const articles: Article[] = [
  {
    slug: "new-vs-old-tax-regime-2025",
    title: "New vs Old Tax Regime: Which Should You Choose in FY 2026-27?",
    description:
      "The Union Budget 2025 revised the new tax regime slabs. Here is a clear breakdown to help you decide which regime saves you more tax this financial year.",
    category: "Tax",
    readTime: "6 min read",
    publishedAt: "2025-03-01",
    updatedAt: "2025-04-01",
    content: [
      {
        heading: "Overview of the Two Regimes",
        paragraphs: [
          "India has two parallel income tax regimes — the old regime and the new regime introduced in FY 2020-21. The new regime was revamped in FY 2023-24 and made the default option. In Budget 2025, the government raised the basic exemption limit under the new regime to ₹4 lakh and restructured the slabs, making it more attractive for middle-income earners.",
          "The fundamental difference: the old regime allows a host of deductions (80C, 80D, HRA, LTA, home loan interest etc.) while the new regime offers lower base rates but almost no deductions. The best choice depends entirely on how much you can claim in deductions.",
        ],
      },
      {
        heading: "New Tax Regime Slabs for FY 2026-27",
        paragraphs: [
          "The revised new regime slabs are as follows. Income up to ₹4 lakh is nil. From ₹4 lakh to ₹8 lakh it is 5%. From ₹8 lakh to ₹12 lakh it is 10%. From ₹12 lakh to ₹16 lakh it is 15%. From ₹16 lakh to ₹20 lakh it is 20%. From ₹20 lakh to ₹24 lakh it is 25%. Above ₹24 lakh it is 30%.",
          "Additionally, a rebate under Section 87A means that taxpayers with income up to ₹12 lakh have zero tax liability under the new regime (before surcharge and cess).",
        ],
        bullets: [
          "Standard deduction of ₹75,000 is available under the new regime",
          "Employer NPS contribution (Section 80CCD(2)) is still deductible",
          "No HRA, 80C, 80D, or home loan deductions allowed",
        ],
      },
      {
        heading: "Old Regime: Still Worth It for High Deduction Claimants",
        paragraphs: [
          "The old regime has a basic exemption limit of ₹2.5 lakh for individuals below 60. Slabs go from 5% (up to ₹5 lakh), 20% (₹5–10 lakh), and 30% above ₹10 lakh. The rebate under 87A applies up to ₹5 lakh, giving zero tax for that income band.",
          "If you pay substantial home loan EMIs, have significant 80C investments (PPF, ELSS, LIC), and your employer pays HRA, the old regime can still result in lower tax. A salaried employee in a metro city with a home loan and maximum 80C deductions may find the old regime saves ₹20,000–₹50,000 in annual tax.",
        ],
        bullets: [
          "Home loan interest deduction up to ₹2 lakh (Section 24b)",
          "Section 80C deductions up to ₹1.5 lakh",
          "Health insurance premium under 80D up to ₹25,000 (₹50,000 for senior parents)",
          "HRA exemption based on actual rent paid",
          "LTA exemption for travel expenses",
        ],
      },
      {
        heading: "Quick Decision Framework",
        paragraphs: [
          "Start by calculating your total eligible deductions under the old regime. If your total deductions (80C + HRA + home loan interest + 80D etc.) exceed approximately ₹3.75 lakh, the old regime is likely better. Below that threshold, the new regime will usually save more tax.",
          "Use our Income Tax Calculator to compare both regimes side-by-side in under a minute. Enter your income and deductions, and the tool shows tax payable under both regimes so you can make an informed choice.",
        ],
      },
    ],
  },
  {
    slug: "home-loan-emi-tips",
    title: "5 Tips to Reduce Your Home Loan EMI Without Prepaying",
    description:
      "Struggling with a heavy home loan EMI? These five strategies can meaningfully reduce your monthly outgo without requiring lump sum prepayments.",
    category: "Loans",
    readTime: "5 min read",
    publishedAt: "2025-02-14",
    content: [
      {
        heading: "Why Your EMI Feels Heavy",
        paragraphs: [
          "A home loan is typically the largest financial commitment most Indians make. With repo rate hikes between 2022 and 2024 pushing effective home loan rates to 9–9.5%, many borrowers saw their EMIs jump or their loan tenures extend dramatically. The good news is that you have several levers to pull even without making a large lump sum payment.",
        ],
      },
      {
        heading: "Tip 1: Negotiate a Rate Reduction with Your Bank",
        paragraphs: [
          "If your credit score has improved or your bank is offering lower rates to new customers, write a formal request to your home loan department for a rate revision. Many banks quietly reduce rates for existing borrowers when prodded. Even a 0.25% reduction on a ₹50 lakh loan can reduce your EMI by ₹800–₹1,000 per month.",
          "If your bank refuses, use that as leverage to initiate a balance transfer to a competing lender. The threat of losing a good customer often results in immediate rate concessions.",
        ],
      },
      {
        heading: "Tip 2: Switch to a Lower-Rate Lender via Balance Transfer",
        paragraphs: [
          "A home loan balance transfer moves your outstanding principal to a new lender at a lower interest rate. For example, moving from 9.25% to 8.75% on ₹40 lakh outstanding can reduce your EMI by over ₹1,200 per month. Over a 15-year remaining tenure, that is over ₹2 lakh in savings.",
          "Account for processing fees (typically 0.5–1% of the loan amount) before deciding. The break-even point is usually 12–18 months of EMI savings covering the transfer cost.",
        ],
      },
      {
        heading: "Tip 3: Extend Your Loan Tenure",
        paragraphs: [
          "If you originally took a 15-year loan, ask your bank to restructure it to 20 years. Extending the tenure by 5 years on a ₹50 lakh loan at 9% can reduce your monthly EMI from around ₹50,700 to ₹45,000 — a saving of ₹5,700 per month. You will pay more total interest over the life of the loan, so use this only if cash flow is genuinely tight.",
        ],
        bullets: [
          "Tenure extension is available without additional processing fees at most banks",
          "Maximum tenure for most home loans is 30 years or up to age 70, whichever is earlier",
          "You can always prepay later when income improves",
        ],
      },
      {
        heading: "Tip 4: Claim the Full Tax Benefit on Interest",
        paragraphs: [
          "Under Section 24(b) of the Income Tax Act, you can deduct up to ₹2 lakh of home loan interest per year under the old tax regime. For a taxpayer in the 30% bracket, this saves up to ₹60,000 in tax annually — effectively reducing the real cost of your EMI. This does not reduce the EMI itself, but it improves your net cash position.",
        ],
      },
      {
        heading: "Tip 5: Convert from Fixed to Floating Rate",
        paragraphs: [
          "If you are on a fixed-rate home loan taken during a high-rate environment, check whether your bank allows conversion to a floating rate. Fixed rates are typically 0.5–1% higher than prevailing floating rates. Switching can reduce your EMI immediately. Note that floating rates carry the risk of increase in future rate cycles.",
          "Use our EMI Calculator to model different rate and tenure scenarios and find the combination that suits your budget.",
        ],
      },
    ],
  },
  {
    slug: "sip-vs-lumpsum",
    title: "SIP vs Lump Sum: Which is Better for Mutual Fund Investment?",
    description:
      "Both SIP and lump sum investing have merit — but the right choice depends on your cash flow, market timing, and investment horizon. Here is a data-driven comparison.",
    category: "Investment",
    readTime: "7 min read",
    publishedAt: "2025-01-20",
    content: [
      {
        heading: "What is SIP?",
        paragraphs: [
          "A Systematic Investment Plan (SIP) lets you invest a fixed amount in a mutual fund at regular intervals — typically monthly. Instead of trying to time the market, you invest consistently regardless of whether markets are up or down. This strategy is called rupee-cost averaging.",
          "For example, investing ₹10,000 per month in a diversified equity fund for 10 years at an assumed 12% CAGR can grow to approximately ₹23.2 lakh — more than double the total investment of ₹12 lakh.",
        ],
      },
      {
        heading: "What is Lump Sum Investing?",
        paragraphs: [
          "A lump sum investment means deploying a large amount at once — typically when you receive a bonus, inheritance, or PF withdrawal. If you invest at the right time (near market lows), lump sum investments can generate significantly higher returns than SIP over the same period because the entire corpus compounds from day one.",
          "The risk is timing. Investing a lump sum at market highs — like in early 2008 or early 2020 — can result in years of underperformance as you wait for markets to recover.",
        ],
      },
      {
        heading: "Rupee Cost Averaging: SIP's Key Advantage",
        paragraphs: [
          "When markets fall, your SIP buys more units at lower prices. When markets recover, those additional units deliver amplified returns. This is the power of rupee cost averaging. Historically, investors who continued SIPs through market crashes (2008, 2020) ended up with significantly better returns than those who stopped.",
          "The data from AMFI India shows that a 15-year SIP in Nifty 50 index funds has rarely delivered less than 10% CAGR, regardless of start date. This consistency is a key advantage for salaried investors.",
        ],
        bullets: [
          "SIP instills financial discipline through auto-debit",
          "Reduces emotional decision-making during market swings",
          "No need to time the market",
          "Suitable for investors with regular monthly income",
        ],
      },
      {
        heading: "When Lump Sum Works Better",
        paragraphs: [
          "If you have a windfall and markets are at a correction of 20% or more from all-time highs, deploying a lump sum is mathematically advantageous. Historical NIFTY data shows that lump sum investments made during corrections of 15%+ have outperformed equivalent SIPs in 80% of cases over a subsequent 5-year period.",
          "For debt funds or liquid funds, lump sum is almost always preferred since these categories have low volatility and there is little benefit to averaging.",
        ],
        bullets: [
          "Lump sum is better for debt and liquid funds",
          "Ideal when you receive a large one-time income",
          "Best deployed during significant market corrections",
          "Consider Systematic Transfer Plans (STP) as a middle ground",
        ],
      },
      {
        heading: "The Verdict",
        paragraphs: [
          "For most salaried Indians with a monthly surplus to invest, SIP is the superior strategy — primarily because it removes the burden of timing and enforces consistency. For investors with large idle cash, consider parking it in a liquid fund and running a Systematic Transfer Plan (STP) into equity funds over 6–12 months.",
          "Use our SIP Calculator to project returns at different monthly amounts and tenures. You can also model both scenarios to see the difference in projected corpus.",
        ],
      },
    ],
  },
  {
    slug: "gst-for-freelancers",
    title: "GST Registration for Freelancers: When Is It Mandatory?",
    description:
      "Many freelancers and independent consultants are unsure about GST registration thresholds and compliance requirements. This guide clarifies when registration is compulsory and when it is optional.",
    category: "GST",
    readTime: "5 min read",
    publishedAt: "2025-02-28",
    content: [
      {
        heading: "GST Registration Thresholds for Service Providers",
        paragraphs: [
          "As of FY 2026-27, GST registration is mandatory for service providers (including freelancers, consultants, and independent professionals) when their aggregate annual turnover exceeds ₹20 lakh. For freelancers in special category states (such as Manipur, Mizoram, Nagaland, Tripura), the threshold is ₹10 lakh.",
          "Importantly, this threshold applies to your total revenue from services, not your profit. If you invoice clients for ₹22 lakh in a year but your expenses bring net income to ₹12 lakh, you still need to register because gross turnover crossed ₹20 lakh.",
        ],
      },
      {
        heading: "Mandatory Registration Regardless of Turnover",
        paragraphs: [
          "Certain categories of freelancers must register regardless of turnover. If you provide services to clients outside India (exports), you must register for GST. This applies to software developers, content writers, designers, and consultants working with overseas clients.",
          "However, exports of services are zero-rated under GST, meaning you do not charge GST to foreign clients. You can also claim refunds on input tax credits related to exported services.",
        ],
        bullets: [
          "Exports of services: mandatory registration, zero GST charged",
          "Supply through e-commerce operators (like Upwork, Fiverr): registration mandatory irrespective of turnover",
          "Inter-state service supply above ₹20 lakh: mandatory registration",
          "Casual taxable person (temporary work in another state): registration required",
        ],
      },
      {
        heading: "GST Rate for Freelancers",
        paragraphs: [
          "Most professional and consulting services attract GST at 18%. This applies to software development, graphic design, content creation, marketing consultancy, legal services, and similar work. When you raise an invoice to a business client, you charge 18% GST on top of your fee.",
          "If your client is a registered business, they claim the 18% GST as input tax credit (ITC), effectively making your services cost-neutral from a GST perspective for them. GST is a cost only when you bill unregistered individuals or consumers.",
        ],
      },
      {
        heading: "Voluntary Registration: When It Makes Sense",
        paragraphs: [
          "Even if your turnover is below ₹20 lakh, voluntary GST registration can benefit you. If you have significant business expenses on which GST was charged (software subscriptions, office rent, equipment), you can claim input tax credit only if you are GST-registered. This can meaningfully reduce your overall tax outgo.",
          "Voluntary registration also lends credibility when pitching to corporate clients. Many procurement teams prefer vendors with a GSTIN for seamless ITC claims on their end.",
        ],
        bullets: [
          "Claim ITC on business expenses like software, equipment, internet",
          "Build credibility with corporate and enterprise clients",
          "Required if you plan to scale and eventually cross the threshold",
          "Compliance cost: monthly or quarterly filing of GSTR-1 and GSTR-3B",
        ],
      },
      {
        heading: "Practical Compliance Checklist",
        paragraphs: [
          "Once registered, you must issue GST-compliant invoices with your GSTIN, file GSTR-1 (outward supplies) monthly or quarterly, and file GSTR-3B (summary return with tax payment) monthly. Annual GSTR-9 is required for turnover above ₹2 crore. Use our GST Invoice Generator to create compliant invoices instantly.",
        ],
      },
    ],
  },
  {
    slug: "hra-exemption-guide",
    title: "HRA Exemption: How to Maximise Your House Rent Allowance",
    description:
      "HRA is one of the most valuable salary components for tax saving. Learn the exact formula, common mistakes to avoid, and how to claim the maximum exemption.",
    category: "Salary",
    readTime: "6 min read",
    publishedAt: "2025-01-10",
    content: [
      {
        heading: "What is HRA and How is it Taxed?",
        paragraphs: [
          "House Rent Allowance (HRA) is a salary component that many employers provide to help employees cover rental expenses. The HRA you receive is not fully tax-exempt — the exemption is calculated based on a three-way minimum rule. The amount above the exempt portion is added to your taxable income.",
          "HRA exemption is available only under the old tax regime. If you have opted for the new tax regime, HRA is fully taxable regardless of actual rent paid.",
        ],
      },
      {
        heading: "The HRA Exemption Formula",
        paragraphs: [
          "The exempt amount is the minimum of three values: (1) Actual HRA received from employer, (2) Actual rent paid minus 10% of basic salary, and (3) 50% of basic salary if you live in a metro city (Delhi, Mumbai, Kolkata, Chennai) or 40% of basic salary for non-metro cities.",
          "For example, if your basic salary is ₹60,000/month, HRA received is ₹24,000/month, and actual rent paid is ₹20,000/month in Mumbai: Value 1 = ₹24,000. Value 2 = ₹20,000 – ₹6,000 = ₹14,000. Value 3 = 50% × ₹60,000 = ₹30,000. The exempt HRA = minimum of (₹24,000, ₹14,000, ₹30,000) = ₹14,000/month.",
        ],
        bullets: [
          "Metro cities: Delhi, Mumbai, Kolkata, Chennai qualify for 50% rule",
          "All other cities qualify for 40% rule",
          "Basic salary for this calculation excludes DA unless DA forms part of retirement benefits",
          "Rent to family members is allowed but requires proper rent agreement",
        ],
      },
      {
        heading: "Documentation Required",
        paragraphs: [
          "To claim HRA exemption during tax filing or from your employer's payroll department, you need rent receipts showing the landlord's name, address, amount, and your signature. For annual rent exceeding ₹1 lakh, you must also provide the landlord's PAN.",
          "Your employer's HR team will ask for these documents during the investment declaration process (January–March). If you miss the employer window, you can still claim the exemption directly when filing your ITR — calculate the exempt amount yourself using Form 16 data.",
        ],
      },
      {
        heading: "Common Mistakes That Reduce Your Exemption",
        paragraphs: [
          "Many employees make avoidable errors that reduce their HRA exemption. The most common is not increasing declared rent in line with actual rent — if your rent has gone up but you did not update your employer declaration, you leave exemption on the table.",
        ],
        bullets: [
          "Not providing rent receipts to employer on time",
          "Forgetting landlord PAN when annual rent exceeds ₹1 lakh",
          "Claiming HRA when living in own home (not allowed)",
          "Not maintaining a proper rent agreement",
          "Declaring incorrect city type (metro vs non-metro)",
        ],
      },
      {
        heading: "Maximising Your HRA Benefit",
        paragraphs: [
          "To get the maximum HRA exemption, ensure your declared rent is as close to your actual rent as possible. If your employer's HRA component is low, negotiate a salary restructuring to increase the HRA portion (and reduce other taxable components like Special Allowance).",
          "Use our HRA Calculator to compute your exact exempt and taxable HRA in seconds. Enter your basic salary, city type, HRA received, and actual rent paid to get an instant breakdown.",
        ],
      },
    ],
  },
  {
    slug: "ppf-vs-elss",
    title: "PPF vs ELSS: Best Tax-Saving Option Under Section 80C",
    description:
      "Both PPF and ELSS qualify for the ₹1.5 lakh deduction under Section 80C, but they differ significantly in returns, risk, and lock-in. Here is a side-by-side comparison to help you choose.",
    category: "Investment",
    readTime: "6 min read",
    publishedAt: "2025-03-10",
    content: [
      {
        heading: "Section 80C: The ₹1.5 Lakh Tax-Saving Bucket",
        paragraphs: [
          "Section 80C of the Income Tax Act allows you to claim a deduction of up to ₹1.5 lakh per financial year by investing in specified instruments. For someone in the 30% tax bracket, maximising 80C saves ₹46,800 in taxes annually (₹1.5 lakh × 30% + 4% cess). Both PPF and ELSS are popular 80C instruments, but they are fundamentally different products.",
          "Note that 80C deductions are only available under the old tax regime. Under the new tax regime, neither PPF contributions (beyond the interest which remains tax-free) nor ELSS qualifies for deductions.",
        ],
      },
      {
        heading: "Public Provident Fund (PPF): Safety and Guaranteed Returns",
        paragraphs: [
          "PPF is a government-backed savings scheme that currently offers 7.1% per annum, compounded annually. Contributions of up to ₹1.5 lakh per year are allowed. The scheme has a 15-year lock-in with partial withdrawal allowed after year 7. The interest earned and maturity corpus are completely tax-free — making it an EEE (Exempt-Exempt-Exempt) instrument.",
          "PPF is ideal for conservative investors who want guaranteed, tax-free returns with zero market risk. It is especially valuable as a debt component of your overall portfolio.",
        ],
        bullets: [
          "Current rate: 7.1% p.a. (revised quarterly by government)",
          "Lock-in: 15 years (extendable in blocks of 5 years)",
          "Maximum annual investment: ₹1.5 lakh",
          "EEE tax status: contribution, interest, and maturity are all tax-exempt",
          "Partial withdrawal from year 7; loans available from year 3",
        ],
      },
      {
        heading: "ELSS: Market-Linked Returns with a Shorter Lock-In",
        paragraphs: [
          "Equity Linked Savings Schemes (ELSS) are diversified equity mutual funds that qualify for 80C deduction. They have the shortest lock-in period among all 80C instruments — just 3 years. ELSS funds are invested primarily in equities (minimum 80%) and have historically delivered 12–15% CAGR over 5–10 year periods, though past performance is not a guarantee.",
          "Returns from ELSS are subject to Long Term Capital Gains (LTCG) tax at 12.5% on gains exceeding ₹1.25 lakh per year. Despite this tax, ELSS has typically outperformed PPF after tax over horizons of 7 years or more.",
        ],
        bullets: [
          "Lock-in: 3 years (shortest among 80C options)",
          "Returns: market-linked, historically 12–15% CAGR over 10 years",
          "LTCG tax: 12.5% on gains above ₹1.25 lakh per year",
          "Risk: moderate to high (equity market exposure)",
          "SIP available: yes, each SIP instalment has its own 3-year lock-in",
        ],
      },
      {
        heading: "Which Should You Choose?",
        paragraphs: [
          "If you are young (under 45) with a long investment horizon, ELSS generally wins on post-tax returns. The 3-year lock-in is far more flexible than PPF's 15 years, and equity markets have historically beaten the PPF interest rate by a wide margin over 10+ year periods.",
          "If you are risk-averse, close to retirement, or need a guaranteed debt component in your 80C allocation, PPF is the better choice. Many financial planners suggest a blended approach: invest ₹50,000–₹75,000 in PPF for stability and the remaining ₹75,000–₹1 lakh in ELSS for growth.",
          "Use our PPF Calculator to project your PPF corpus at different contribution levels. Pair it with our SIP Calculator to model ELSS returns and compare the two scenarios side-by-side.",
        ],
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedCalculator(
  category: Article["category"]
): { label: string; href: string } {
  const map: Record<Article["category"], { label: string; href: string }> = {
    Tax: { label: "Income Tax Calculator", href: "/income-tax-calculator" },
    Loans: { label: "EMI Calculator", href: "/emi-calculator" },
    Investment: { label: "SIP Calculator", href: "/sip-calculator" },
    GST: { label: "GST Calculator", href: "/gst-calculator" },
    Salary: { label: "HRA Calculator", href: "/hra-calculator" },
  };
  return map[category];
}
