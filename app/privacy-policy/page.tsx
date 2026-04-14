import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | CalcBharat",
  description:
    "CalcBharat's privacy policy. We don't collect personal financial data. Learn how we handle your information.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-10">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-400 mb-8">Last updated: April 2026</p>

          <div className="space-y-8 text-gray-600 leading-relaxed">

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">1. Overview</h2>
              <p>
                CalcBharat (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) operates the website calcbharat.com. This Privacy
                Policy explains what information we collect, how we use it, and your rights. We are
                committed to protecting your privacy. We do <strong>not</strong> collect, store, or
                sell any personal financial data you enter into our calculators.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">2. Data We Do NOT Collect</h2>
              <p className="mb-3">CalcBharat does not require any account creation or login. We do not collect:</p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Your name, email address, or phone number</li>
                <li>Your income, salary, or tax details entered in calculators</li>
                <li>Your PAN, Aadhaar, or any other government ID</li>
                <li>Payment or banking information</li>
              </ul>
              <p className="mt-3">
                All calculator inputs and results are processed entirely in your browser and are
                never sent to our servers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">3. Analytics Data (Google Analytics)</h2>
              <p className="mb-3">
                We use <strong>Google Analytics</strong> to understand how visitors use our website.
                Google Analytics collects anonymous usage data such as:
              </p>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Pages visited and time spent on each page</li>
                <li>General geographic location (country/city level)</li>
                <li>Device type (mobile, desktop, tablet)</li>
                <li>Referring website (how you found us)</li>
              </ul>
              <p className="mt-3">
                This data is anonymised and aggregated. It cannot be used to identify you personally.
                Google&apos;s use of this data is governed by the{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Google Privacy Policy
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">4. Cookies</h2>
              <p>
                CalcBharat uses cookies only through Google Analytics for anonymous traffic
                measurement. We do not use cookies for advertising, tracking across other websites,
                or storing your calculator inputs.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">5. Third-Party Services</h2>
              <p>
                Our website is hosted on <strong>Vercel</strong>. Vercel may collect standard
                server logs (IP address, browser type, request timestamps) for infrastructure and
                security purposes. These logs are not shared with us and are governed by{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-600 hover:underline"
                >
                  Vercel&apos;s Privacy Policy
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">6. Children&apos;s Privacy</h2>
              <p>
                CalcBharat is not directed at children under the age of 13. We do not knowingly
                collect any information from children.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">7. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes will be posted
                on this page with an updated date. Continued use of CalcBharat after any changes
                constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900 mb-3">8. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, you can reach us at{" "}
                <a href="mailto:hello@calcbharat.com" className="text-brand-600 hover:underline">
                  hello@calcbharat.com
                </a>.
              </p>
            </section>

          </div>
        </div>
      </div>
    </main>
  );
}
