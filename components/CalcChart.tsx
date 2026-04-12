"use client";
import dynamic from "next/dynamic";
import type { ChartData, ChartOptions } from "chart.js";

// Dynamic imports to keep initial bundle small
const Doughnut = dynamic(() => import("react-chartjs-2").then((m) => m.Doughnut), { ssr: false });
const Bar = dynamic(() => import("react-chartjs-2").then((m) => m.Bar), { ssr: false });
const Line = dynamic(() => import("react-chartjs-2").then((m) => m.Line), { ssr: false });

// Register chart.js components globally
if (typeof window !== "undefined") {
  import("chart.js").then(
    ({
      Chart,
      CategoryScale,
      LinearScale,
      BarElement,
      LineElement,
      PointElement,
      ArcElement,
      Tooltip,
      Legend,
      Filler,
    }) => {
      Chart.register(
        CategoryScale,
        LinearScale,
        BarElement,
        LineElement,
        PointElement,
        ArcElement,
        Tooltip,
        Legend,
        Filler
      );
    }
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyChartData = ChartData<any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyChartOptions = ChartOptions<any>;

interface CalcChartProps {
  type: "doughnut" | "bar" | "line";
  data: AnyChartData;
  options?: AnyChartOptions;
  height?: number;
  title?: string;
}

const defaultDoughnutOptions: ChartOptions<"doughnut"> = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { position: "bottom", labels: { font: { size: 12 }, padding: 16 } },
  },
  cutout: "65%",
};

const defaultBarOptions: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom", labels: { font: { size: 12 }, padding: 16 } },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: "#F3F4F6" }, ticks: { font: { size: 11 } } },
  },
};

const defaultLineOptions: ChartOptions<"line"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom", labels: { font: { size: 12 }, padding: 16 } },
  },
  scales: {
    x: { grid: { display: false } },
    y: { grid: { color: "#F3F4F6" }, ticks: { font: { size: 11 } } },
  },
};

export default function CalcChart({ type, data, options, height = 280, title }: CalcChartProps) {
  const mergedOptions = {
    ...(type === "doughnut" ? defaultDoughnutOptions : type === "bar" ? defaultBarOptions : defaultLineOptions),
    ...options,
  };

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {title && <h3 className="text-sm font-semibold text-gray-700 mb-3">{title}</h3>}
      <div style={{ height: type === "doughnut" ? "auto" : height }}>
        {type === "doughnut" && <Doughnut data={data} options={mergedOptions} />}
        {type === "bar" && <Bar data={data} options={mergedOptions} />}
        {type === "line" && <Line data={data} options={mergedOptions} />}
      </div>
    </div>
  );
}
