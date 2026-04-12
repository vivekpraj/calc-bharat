"use client";

interface AdSlotProps {
  slot: string;
  format?: "rectangle" | "leaderboard" | "mobile";
  className?: string;
}

export default function AdSlot({ slot, format = "rectangle", className = "" }: AdSlotProps) {
  const dimensions: Record<string, string> = {
    rectangle: "w-[300px] h-[600px]",
    leaderboard: "w-[728px] h-[90px]",
    mobile: "w-[320px] h-[100px]",
  };

  return (
    <div
      className={`bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium ${dimensions[format]} ${className}`}
    >
      <div className="text-center">
        <div className="text-xs uppercase tracking-widest mb-1">Advertisement</div>
        <div className="text-gray-300">{slot}</div>
      </div>
    </div>
  );
}
