import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight } from "lucide-react";

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  iconBg?: string;
  iconColor?: string;
}

export default function ToolCard({
  title,
  description,
  href,
  icon: Icon,
  iconBg = "bg-brand-100",
  iconColor = "text-brand-600",
}: ToolCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="relative h-full bg-white rounded-2xl border border-gray-100 p-5 shadow-[0_1px_3px_rgba(0,0,0,0.05),0_4px_12px_-2px_rgba(61,64,220,0.06)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.07),0_12px_28px_-4px_rgba(61,64,220,0.12)] hover:-translate-y-0.5 transition-all duration-200">
        <ArrowUpRight className="absolute top-3.5 right-3.5 w-3.5 h-3.5 text-gray-200 group-hover:text-brand-400 transition-colors" />
        <div className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
          <Icon className={`w-5 h-5 ${iconColor}`} />
        </div>
        <h3 className="text-sm font-semibold text-gray-800 group-hover:text-brand-600 transition-colors leading-snug mb-1.5">
          {title}
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
      </div>
    </Link>
  );
}
