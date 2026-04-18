"use client";
import { useState } from "react";
import { Mail, MessageSquare, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "0e61fa05-a9a0-495b-b904-6d1af76f0e4b",
          subject: `PaisaBatao Contact: ${formData.category} from ${formData.name}`,
          ...formData,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", category: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            Contact Us
          </h1>
          <p className="text-gray-500 text-lg">
            Found a bug? Have a suggestion? We&apos;d love to hear from you.
            We usually respond within <strong className="text-gray-700">24–48 hours</strong>.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Left info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center mb-3">
                <Mail className="w-4 h-4 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1 text-sm">Email Us</h3>
              <a
                href="mailto:hello@paisabatao.in"
                className="text-sm text-brand-600 hover:underline break-all"
              >
                hello@paisabatao.in
              </a>
            </div>

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="w-9 h-9 bg-brand-50 rounded-lg flex items-center justify-center mb-3">
                <MessageSquare className="w-4 h-4 text-brand-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm">What can you write to us about?</h3>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>🐛 Report a bug or wrong calculation</li>
                <li>💡 Suggest a new calculator</li>
                <li>📝 Give feedback on the website</li>
                <li>🤝 General queries</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            {status === "success" ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 flex flex-col items-center justify-center text-center gap-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                <h2 className="text-xl font-bold text-gray-900">Message Sent!</h2>
                <p className="text-gray-500 text-sm">
                  Thanks for reaching out. We&apos;ll get back to you within 24–48 hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 px-5 py-2 bg-brand-600 text-white text-sm font-semibold rounded-xl hover:bg-brand-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-5"
              >
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="rahul@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition bg-white"
                  >
                    <option value="" disabled>Select a category</option>
                    <option value="Bug Report">🐛 Bug Report</option>
                    <option value="Feature Request">💡 Feature Request / New Calculator</option>
                    <option value="Feedback">📝 Website Feedback</option>
                    <option value="General Query">🤝 General Query</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your feedback, bug, or suggestion in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-500">
                    Something went wrong. Please try again or email us directly.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                >
                  {status === "loading" ? "Sending..." : "Send Message"}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  We usually respond within 24–48 hours.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}
