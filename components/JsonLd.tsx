interface FAQItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  faqs: FAQItem[];
  pageName: string;
  pageUrl: string;
  description: string;
}

export default function JsonLd({ faqs, pageName, pageUrl, description }: JsonLdProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": pageName,
    "url": pageUrl,
    "description": description,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "isAccessibleForFree": true,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "INR",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
    </>
  );
}
