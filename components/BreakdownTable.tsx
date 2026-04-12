interface Row {
  label: string;
  value: string;
  highlight?: boolean;
  subLabel?: string;
}

interface BreakdownTableProps {
  rows: Row[];
  title?: string;
}

export default function BreakdownTable({ rows, title }: BreakdownTableProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
      {title && (
        <div className="bg-gray-50 dark:bg-gray-800/60 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-gray-50 dark:border-gray-800 last:border-0 ${
                row.highlight
                  ? "bg-brand-50 dark:bg-brand-900/20"
                  : i % 2 === 0
                  ? "bg-white dark:bg-gray-900"
                  : "bg-gray-50/50 dark:bg-gray-800/30"
              }`}
            >
              <td className="px-4 py-3">
                <div className={`font-medium ${row.highlight ? "text-brand-700 dark:text-brand-300" : "text-gray-700 dark:text-gray-300"}`}>
                  {row.label}
                </div>
                {row.subLabel && <div className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{row.subLabel}</div>}
              </td>
              <td className={`px-4 py-3 text-right font-semibold ${row.highlight ? "text-brand-700 dark:text-brand-300" : "text-gray-900 dark:text-gray-100"}`}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
