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
    slug: "how-to-file-itr-fy-2025-26",
    title: "How to File ITR Online for FY 2025-26 (AY 2026-27) — Step by Step Guide",
    description:
      "Complete step-by-step guide to file your Income Tax Return online for FY 2025-26 (AY 2026-27). From login to e-verification — everything a salaried employee or freelancer needs to know.",
    category: "Tax",
    readTime: "8 min read",
    publishedAt: "2026-04-24",
    content: [
      {
        heading: "Before You Start — Documents You Need",
        paragraphs: [
          "Filing your ITR for FY 2025-26 is now open on the Income Tax e-filing portal (incometax.gov.in). Before you begin, keep these documents handy to avoid interruptions. Having everything ready in advance makes the entire process take under 20 minutes for most salaried individuals.",
        ],
        bullets: [
          "PAN card and Aadhaar number",
          "Form 16 — issued by your employer (available by mid-June)",
          "Form 26AS and Annual Information Statement (AIS) — download from incometax.gov.in",
          "Bank account details (account number and IFSC)",
          "Capital gains statements — from broker or mutual fund platform (if applicable)",
          "Home loan interest certificate — for Section 24(b) deduction",
          "Rent receipts — for HRA exemption under old regime",
          "Bank interest certificates — for savings and FD interest income",
        ],
      },
      {
        heading: "Step 1 — Log In to the Income Tax Portal",
        paragraphs: [
          "Go to incometax.gov.in and click on 'Login'. Enter your PAN as the User ID along with your password. If you have not registered yet, click 'Register' and create an account using your PAN. After logging in, go to the 'e-File' menu and select 'Income Tax Returns' → 'File Income Tax Return'.",
          "Important: The portal now shows two tabs — one for the Income Tax Act 1961 and one for the new Income Tax Act 2025. For FY 2025-26 (AY 2026-27), select the tab for Income Tax Act 1961. The new Act applies to Tax Year 2026-27 onwards.",
        ],
      },
      {
        heading: "Step 2 — Select Assessment Year and Filing Mode",
        paragraphs: [
          "Select Assessment Year as '2026-27' from the dropdown. Choose 'Online' as the filing mode — this is the recommended option for most taxpayers as it is faster, pre-filled, and supports e-verification. Click Continue.",
          "Select your filing status as 'Individual'. If you are filing on behalf of an HUF or firm, select accordingly.",
        ],
      },
      {
        heading: "Step 3 — Choose the Correct ITR Form",
        paragraphs: [
          "Selecting the right ITR form is critical. Filing the wrong form results in a defective return notice from the Income Tax Department. Here is a quick guide to choosing the correct form for FY 2025-26.",
        ],
        bullets: [
          "ITR-1 (Sahaj): Salaried individuals with income from salary, up to two house properties, and interest — total income up to ₹50 lakh. Cannot be used if you have capital gains, foreign assets, or business income. (New for AY 2026-27: now allows two house properties, previously only one)",
          "ITR-2: Salaried individuals with capital gains (stocks, mutual funds, property), more than two house properties, or income above ₹50 lakh — deadline 31 July 2026",
          "ITR-3: Individuals with income from business or profession along with salary — deadline 31 August 2026 for non-audit cases",
          "ITR-4 (Sugam): Individuals and HUFs with presumptive business income under Section 44AD/44ADA/44AE — turnover up to ₹2 crore. Now also allows up to two house properties (new for AY 2026-27). Investment and bank balance disclosure now mandatory.",
        ],
      },
      {
        heading: "Step 4 — Review and Validate Pre-filled Data",
        paragraphs: [
          "The portal pre-fills your personal details, income, TDS, and bank information using data from your employer, banks, and other sources. Do not simply accept the pre-filled data — always verify it against your Form 16 and AIS before proceeding. Errors in pre-filled data are common and can result in incorrect tax computation.",
          "Check your salary income against Form 16 Part B. Verify TDS credits against Form 26AS. If any income appears in AIS that you do not recognise, cross-check with your bank statements before either accepting or disputing the entry.",
        ],
        bullets: [
          "Verify name, PAN, date of birth, and address",
          "Confirm salary figures match Form 16 Part B",
          "Check TDS credits in Form 26AS match your return",
          "Add any income not pre-filled — rental income, freelance income, FD interest",
          "Ensure bank account is pre-validated for refund credit",
        ],
      },
      {
        heading: "Step 5 — Choose Your Tax Regime",
        paragraphs: [
          "For FY 2025-26, you must declare whether you are filing under the old tax regime or the new tax regime. The new regime is the default — if you want to switch to the old regime, you must explicitly opt for it in the ITR form. Salaried individuals (without business income) can switch regimes every year.",
          "Under the new regime for FY 2025-26, income up to ₹12 lakh attracts zero tax due to the Section 87A rebate, and the standard deduction is ₹75,000. Under the old regime, you can claim deductions under 80C (up to ₹1.5 lakh), HRA, home loan interest, 80D, and others. Use our Income Tax Calculator to compare both regimes before making your choice.",
        ],
      },
      {
        heading: "Step 6 — Enter Income, Deductions and Compute Tax",
        paragraphs: [
          "Fill in your income details across all heads — salary, house property, capital gains, other sources (interest, dividends). Then enter your deductions under Chapter VI-A if you are on the old regime (80C, 80D, 80E, etc.). The portal will automatically compute your total tax liability.",
          "If you have already paid advance tax or self-assessment tax, verify those entries against your Challan receipts. If additional tax is payable after considering TDS, you must pay it via Challan 280 on the portal before submitting the return. Tax paid after filing attracts interest under Section 234B and 234C.",
        ],
        bullets: [
          "Salary: enter gross salary and exempt allowances (HRA, LTA)",
          "House property: rental income minus 30% standard deduction and loan interest",
          "Capital gains: short term (STCG) and long term (LTCG) from stocks, MF, property",
          "Other sources: savings interest, FD interest, dividend income",
          "Deductions: 80C, 80CCD(1B), 80D, 80E, 80G, HRA (old regime only)",
        ],
      },
      {
        heading: "Step 7 — Submit and E-Verify Your Return",
        paragraphs: [
          "Once you have reviewed all details and the tax computation looks correct, click 'Preview Return' → 'Proceed to Validation' → 'Submit'. After submission, you must e-verify your return within 30 days. If you do not e-verify within 30 days, your return will be treated as not filed, even if submitted.",
          "E-verification is quick and free. The easiest method is Aadhaar OTP — an OTP is sent to the mobile number linked to your Aadhaar. Other methods include net banking EVC, bank ATM EVC, or Demat account EVC. If none of these work, you can download the ITR-V acknowledgement and send a signed physical copy to CPC Bengaluru by speed post within 30 days.",
        ],
        bullets: [
          "Aadhaar OTP: fastest method — requires mobile linked to Aadhaar",
          "Net Banking: login to your bank's net banking and generate EVC",
          "Bank ATM: generate EVC from your bank's ATM",
          "Physical ITR-V: download, sign in blue ink, post to CPC Bengaluru within 30 days",
          "After e-verification, save the acknowledgement number for future reference",
        ],
      },
      {
        heading: "What Happens After Filing?",
        paragraphs: [
          "After successful e-verification, your ITR is processed by the Centralised Processing Centre (CPC) in Bengaluru. You will receive an intimation under Section 143(1) — usually within 20–45 days — confirming the return is processed. If a refund is due, it is credited to your pre-validated bank account, usually within 7–30 days of processing.",
          "If there is a mismatch in your return, you may receive a defective return notice under Section 139(9) or a notice for additional information under Section 142(1). Respond promptly to any such notices on the portal. Most issues can be resolved online without visiting a tax office.",
        ],
        bullets: [
          "Processing time: 20–45 days after e-verification",
          "Refund credit: 7–30 days after processing (directly to bank account)",
          "Section 143(1) intimation: confirms return is accepted or highlights mismatch",
          "Keep Form 16, investment proofs, and rent receipts for at least 6 years",
        ],
      },
    ],
  },
  {
    slug: "itr-filing-last-date-2026",
    title: "ITR Filing Last Date 2026 — Deadlines for Salaried, Business & Audit Cases",
    description:
      "Complete guide to ITR filing deadlines for FY 2025-26 (AY 2026-27). Know the last date for salaried employees, self-employed, business owners, and audit cases. Avoid penalties with this deadline checklist.",
    category: "Tax",
    readTime: "7 min read",
    publishedAt: "2026-04-23",
    content: [
      {
        heading: "ITR Filing Deadlines for FY 2025-26 (AY 2026-27) — Quick Summary",
        paragraphs: [
          "The Income Tax Return (ITR) filing season for FY 2025-26 (Assessment Year 2026-27) is now open. The ITR forms for AY 2026-27 have been notified by the Income Tax Department. Here are the key deadlines you need to mark in your calendar.",
        ],
        bullets: [
          "Salaried individuals & non-business taxpayers: 31 July 2026",
          "Self-employed & non-audit business taxpayers: 31 August 2026 (extended from July 31 in Budget 2026)",
          "Businesses requiring tax audit (turnover above ₹1 crore / ₹10 crore): 31 October 2026",
          "Transfer pricing cases: 30 November 2026",
          "Belated / revised return: 31 December 2026",
          "Updated return (ITR-U): within 48 months from end of relevant assessment year",
        ],
      },
      {
        heading: "ITR Last Date for Salaried Employees — 31 July 2026",
        paragraphs: [
          "If you are a salaried employee with income only from salary, one house property, interest, and other sources (no business or professional income), the last date to file your ITR for FY 2025-26 is 31 July 2026. This applies to taxpayers filing ITR-1 (Sahaj) and ITR-2.",
          "Most salaried taxpayers receive Form 16 from their employer by mid-June. You should ideally file your ITR within 2–3 weeks of receiving Form 16 to avoid last-minute rush and server slowdowns on the e-filing portal. The Annual Information Statement (AIS) and Tax Information Summary (TIS) on the income tax portal should be checked before filing to ensure all income and TDS entries match.",
        ],
        bullets: [
          "Applicable forms: ITR-1 (Sahaj) and ITR-2",
          "Form 16 typically issued by employer by 15 June",
          "Verify AIS / TIS on incometax.gov.in before filing",
          "Pre-filled data available on the e-filing portal — verify before submitting",
        ],
      },
      {
        heading: "ITR Last Date for Self-Employed & Freelancers — 31 August 2026",
        paragraphs: [
          "Budget 2026 introduced an important change for non-audit business taxpayers. The ITR filing deadline for self-employed individuals, freelancers, consultants, and small business owners who do not require a tax audit has been moved from 31 July to 31 August 2026. This gives an extra month to organise accounts and file accurately.",
          "If you run a business or profession and your turnover is below the tax audit threshold (₹1 crore for businesses, ₹50 lakh for professionals), you fall in this category. You will typically file using ITR-3 or ITR-4 (Sugam). The one-month extension is especially useful for those who need time to reconcile GST returns, bank statements, and expense records.",
        ],
        bullets: [
          "Applicable forms: ITR-3, ITR-4 (Sugam)",
          "Turnover threshold for this category: below ₹1 crore (business) or ₹50 lakh (profession)",
          "New deadline: 31 August 2026 — one month later than salaried taxpayers",
          "Ensure books of accounts are maintained as required under the Income Tax Act",
        ],
      },
      {
        heading: "ITR Last Date for Audit Cases — 31 October 2026",
        paragraphs: [
          "Businesses and professionals whose accounts are required to be audited under Section 44AB must file their ITR by 31 October 2026. The tax audit report in Form 3CA/3CB and 3CD must be uploaded by the Chartered Accountant before the ITR can be filed. The audit report deadline is typically 30 September.",
          "Tax audit is mandatory when business turnover exceeds ₹1 crore (or ₹10 crore if cash transactions are less than 5% of total transactions) or when professional receipts exceed ₹50 lakh. It is also required when a taxpayer opts out of the presumptive taxation scheme under Section 44AD/44ADA and declares income below the prescribed percentage.",
        ],
        bullets: [
          "Tax audit required: business turnover above ₹1 crore (₹10 crore for digital-heavy businesses)",
          "Professional receipts above ₹50 lakh: audit mandatory",
          "CA must upload audit report before ITR filing",
          "Penalty for missing audit deadline: ₹1.5 lakh or 0.5% of turnover, whichever is lower",
        ],
      },
      {
        heading: "Penalty for Late ITR Filing — Section 234F",
        paragraphs: [
          "Under the new Income Tax Act 2025 (Section 428, replacing Section 234F), if you miss the ITR filing due date, a late fee is levied at the time of filing the belated return. The fee is ₹1,000 if your total income does not exceed ₹5 lakh. If your income is above ₹5 lakh, the late fee is ₹5,000.",
          "In addition to the late filing fee, you will also lose the ability to carry forward losses from capital gains, business, or speculation income if you file late. Interest under Section 234A may also apply if you have outstanding tax dues. Filing on time is always the better option.",
        ],
        bullets: [
          "Income up to ₹5 lakh: late fee ₹1,000",
          "Income above ₹5 lakh: late fee ₹5,000",
          "Cannot carry forward capital loss if ITR is filed after due date",
          "Interest at 1% per month under Section 234A on unpaid tax",
          "Belated return can be filed up to 31 December 2026",
        ],
      },
      {
        heading: "What is ITR-U (Updated Return) and When Can You File It?",
        paragraphs: [
          "ITR-U, introduced in Budget 2022, allows taxpayers to correct omissions or errors in a previously filed return, or file a return even if the original deadline was missed — up to a much longer window. Budget 2026 extended the ITR-U window to 48 months (4 years) from the end of the relevant assessment year, giving taxpayers greater flexibility.",
          "For example, for AY 2026-27 (FY 2025-26), you can file an ITR-U up to 31 March 2031. However, filing an updated return requires payment of additional tax — 25% of aggregate tax and interest if filed within 12 months, and 50% if filed after 12 months but within 24 months, and so on. ITR-U cannot be used to claim a refund or reduce tax liability — it is only for declaring additional income.",
        ],
        bullets: [
          "ITR-U window: 48 months from end of assessment year (extended in Budget 2026)",
          "Additional tax of 25%–50% of due tax applies",
          "Cannot be used to reduce tax liability or claim refund",
          "Useful for declaring missed income to avoid scrutiny or prosecution",
        ],
      },
      {
        heading: "ITR Filing Checklist for FY 2025-26",
        paragraphs: [
          "Before you sit down to file your ITR for FY 2025-26, make sure you have these documents ready: Form 16 from employer, Form 26AS (tax credit statement), Annual Information Statement (AIS) from incometax.gov.in, bank interest certificates, capital gains statements from broker or mutual fund platforms, and home loan interest certificates if applicable.",
          "Use our Income Tax Calculator to compare the tax liability under old and new regime before filing. Choosing the wrong regime at the time of filing could mean paying more tax than necessary. You can switch regimes every year if you do not have business income.",
        ],
        bullets: [
          "Form 16: issued by employer, shows salary and TDS",
          "Form 26AS / AIS: verify all TDS credits and income entries",
          "Bank interest: savings account, FD interest must be declared",
          "Capital gains: equity, mutual funds, property sale gains",
          "Home loan certificate: for Section 24(b) and 80EEA deductions",
          "Rent receipts: for HRA exemption under old regime",
        ],
      },
    ],
  },
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
