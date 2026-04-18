import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | PaisaBatao",
  description:
    "Terms of Use for PaisaBatao. Our calculators are for informational purposes only and do not constitute financial or legal advice.",
};

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Terms of Use</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using PaisaBatao (paisabatao.in), you agree to be bound by these
                Terms of Use. If you do not agree, please do not use this website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Informational Purpose Only</h2>
              <p className="mb-3">
                All calculators, tools, articles, and content on PaisaBatao are provided for
                <strong> informational and educational purposes only</strong>. They do not
                constitute financial, tax, investment, or legal advice.
              </p>
              <p>
                Results produced by our calculators are estimates based on the inputs you provide
                and standard formulas. Actual tax liability, loan repayments, investment returns,
                or other financial outcomes may vary. Always consult a qualified{" "}
                <strong>Chartered Accountant (CA)</strong> or licensed financial advisor before
                making any financial decision.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Accuracy of Information</h2>
              <p className="mb-3">
                We make every effort to keep our calculators accurate and up-to-date with the
                latest Indian tax laws, Budget announcements, and regulatory changes. However,
                we do not guarantee that all information is complete, accurate, or current.
              </p>
              <p>
                Tax laws and financial regulations change frequently. It is your responsibility
                to verify all results with official sources such as the Income Tax Department
                (incometaxindia.gov.in) or a qualified professional.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Limitation of Liability</h2>
              <p>
                PaisaBatao and its owners shall not be liable for any loss, damage, or financial
                consequence arising from your use of, or reliance on, any calculator, tool, or
                content on this website. Use of this website is entirely at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Intellectual Property</h2>
              <p>
                All content on PaisaBatao — including text, design, code, logos, and calculator
                interfaces — is the property of PaisaBatao. You may not copy, reproduce,
                distribute, or create derivative works from any content on this website without
                our prior written permission.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites for reference purposes.
                We are not responsible for the content, accuracy, or privacy practices of any
                third-party websites. Links do not imply endorsement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms of Use at any time. Changes will be
                posted on this page with an updated date. Continued use of PaisaBatao after
                any changes constitutes your acceptance of the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Governing Law</h2>
              <p>
                These Terms of Use shall be governed by and construed in accordance with the
                laws of India. Any disputes shall be subject to the exclusive jurisdiction of
                the courts of India.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">9. Contact</h2>
              <p>
                For any questions regarding these Terms of Use, contact us at{" "}
                <a href="mailto:hello@paisabatao.in" className="text-brand-600 hover:underline">
                  hello@paisabatao.in
                </a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
