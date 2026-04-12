import { RefreshCw } from "lucide-react";

interface Props {
  label?: string;
}

export default function LastUpdatedBadge({ label = "Tax slabs updated for FY 2026-27" }: Props) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-full">
      <RefreshCw className="w-3 h-3" />
      {label}
    </span>
  );
}
