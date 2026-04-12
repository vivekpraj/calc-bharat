"use client";
import { useCallback } from "react";

interface SliderInputProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  prefix?: string;
  onChange: (value: number) => void;
  formatDisplay?: (value: number) => string;
  formatMin?: (value: number) => string;
  formatMax?: (value: number) => string;
}

export default function SliderInput({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  prefix = "",
  onChange,
  formatDisplay,
  formatMin,
  formatMax,
}: SliderInputProps) {
  const displayValue = formatDisplay ? formatDisplay(value) : `${value.toLocaleString("en-IN")}`;
  const minLabel = formatMin ? formatMin(min) : `${prefix}${min.toLocaleString("en-IN")}${unit}`;
  const maxLabel = formatMax ? formatMax(max) : `${prefix}${max.toLocaleString("en-IN")}${unit}`;

  const handleSlider = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(parseFloat(e.target.value));
    },
    [onChange]
  );

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      const num = parseFloat(raw);
      if (!isNaN(num)) {
        onChange(Math.min(max, Math.max(min, num)));
      }
    },
    [onChange, min, max]
  );

  const percent = ((value - min) / (max - min)) * 100;

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex items-center">
          {prefix && <span className="text-sm font-semibold text-gray-500 mr-0.5">{prefix}</span>}
          <input
            type="text"
            value={displayValue}
            onChange={handleInput}
            className="w-28 text-right text-sm font-semibold text-brand-700 border border-brand-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-brand-50"
          />
          {unit && <span className="text-sm font-semibold text-gray-500 ml-0.5">{unit}</span>}
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleSlider}
          style={{
            background: `linear-gradient(to right, #2563EB ${percent}%, #DBEAFE ${percent}%)`,
          }}
          className="w-full h-1.5 rounded-full appearance-none cursor-pointer"
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">{minLabel}</span>
        <span className="text-xs text-gray-400">{maxLabel}</span>
      </div>
    </div>
  );
}
