"use client";
import { useEffect, useRef, useState } from "react";

interface ResultCardProps {
  label: string;
  value: number;
  format: (v: number) => string;
  color?: "blue" | "green" | "amber" | "red" | "gray";
  size?: "lg" | "md" | "sm";
  subtitle?: string;
}

const colorMap = {
  blue: "bg-brand-50 border-brand-200 text-brand-700",
  green: "bg-emerald-50 border-emerald-200 text-emerald-700",
  amber: "bg-amber-50 border-amber-200 text-amber-700",
  red: "bg-red-50 border-red-200 text-red-700",
  gray: "bg-gray-50 border-gray-200 text-gray-700",
};

const labelColorMap = {
  blue: "text-brand-600",
  green: "text-emerald-600",
  amber: "text-amber-600",
  red: "text-red-600",
  gray: "text-gray-600",
};

const sizeMap = {
  lg: "text-3xl font-bold",
  md: "text-xl font-bold",
  sm: "text-base font-semibold",
};

function AnimatedValue({ value, format }: { value: number; format: (v: number) => string }) {
  const [display, setDisplay] = useState(format(value));
  const prevRef = useRef(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const from = prevRef.current;
    const to = value;
    prevRef.current = to;

    if (from === to) return;

    const duration = 500;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(format(from + (to - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [value, format]);

  return <span>{display}</span>;
}

export default function ResultCard({
  label,
  value,
  format,
  color = "blue",
  size = "lg",
  subtitle,
}: ResultCardProps) {
  return (
    <div className={`rounded-2xl border-2 p-4 ${colorMap[color]}`}>
      <p className={`text-xs font-semibold uppercase tracking-wider mb-1 ${labelColorMap[color]}`}>
        {label}
      </p>
      <div className={sizeMap[size]}>
        <AnimatedValue value={value} format={format} />
      </div>
      {subtitle && <p className="text-xs mt-1 opacity-70">{subtitle}</p>}
    </div>
  );
}
