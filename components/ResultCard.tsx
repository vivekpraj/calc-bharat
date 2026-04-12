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
  blue: "bg-brand-50 dark:bg-brand-900/20 border-brand-200 dark:border-brand-700/50 text-brand-700 dark:text-brand-300",
  green: "bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-700/50 text-emerald-700 dark:text-emerald-300",
  amber: "bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50 text-amber-700 dark:text-amber-300",
  red: "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700/50 text-red-700 dark:text-red-300",
  gray: "bg-gray-50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-600/50 text-gray-700 dark:text-gray-300",
};

const labelColorMap = {
  blue: "text-brand-600 dark:text-brand-400",
  green: "text-emerald-600 dark:text-emerald-400",
  amber: "text-amber-600 dark:text-amber-400",
  red: "text-red-600 dark:text-red-400",
  gray: "text-gray-600 dark:text-gray-400",
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
