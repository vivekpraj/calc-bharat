"use client";
import { useEffect, useState } from "react";
import { useSpring } from "framer-motion";

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
  const spring = useSpring(value, { stiffness: 300, damping: 30 });
  const [display, setDisplay] = useState(format(value));

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(format(v)));
  }, [spring, format]);

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
