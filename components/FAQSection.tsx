export interface FAQ {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
  heading?: string;
}

/**
 * Renders a visible FAQ accordion + injects FAQPage JSON-LD schema.
 * Place this in page.tsx (server component) for maximum SEO benefit.
 */
export default function FAQSection({ faqs, heading = "Frequently Asked Questions" }: FAQSectionProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <section className="max-w-3xl mx-auto px-4 pb-14 pt-4">
        <h2 className="text-xl font-bold text-gray-900 mb-5">{heading}</h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden"
            >
              <summary className="flex items-center justify-between gap-3 px-5 py-4 cursor-pointer list-none select-none">
                <span className="text-sm font-semibold text-gray-800">{faq.q}</span>
                {/* chevron */}
                <span className="shrink-0 w-5 h-5 rounded-full bg-brand-50 flex items-center justify-center text-brand-600 transition-transform duration-200 group-open:rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-4 text-sm text-gray-600 leading-relaxed border-t border-gray-50 pt-3">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
