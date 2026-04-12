import Link from "next/link";
import { Calculator } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-16 h-16 bg-brand-100 rounded-2xl flex items-center justify-center mb-6">
        <Calculator className="w-8 h-8 text-brand-600" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Page Not Found</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        The calculator you&apos;re looking for doesn&apos;t exist yet. Check out our available tools below.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-brand-600 text-white font-semibold rounded-xl hover:bg-brand-700 transition-colors"
      >
        View All Calculators
      </Link>
    </div>
  );
}
