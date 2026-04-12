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
    <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
      {title && (
        <div className="bg-gray-50 px-4 py-3 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        </div>
      )}
      <table className="w-full text-sm">
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className={`border-b border-gray-50 last:border-0 ${
                row.highlight
                  ? "bg-brand-50"
                  : i % 2 === 0
                  ? "bg-white"
                  : "bg-gray-50/50"
              }`}
            >
              <td className="px-4 py-3">
                <div className={`font-medium ${row.highlight ? "text-brand-700" : "text-gray-700"}`}>
                  {row.label}
                </div>
                {row.subLabel && <div className="text-xs text-gray-400 mt-0.5">{row.subLabel}</div>}
              </td>
              <td className={`px-4 py-3 text-right font-semibold ${row.highlight ? "text-brand-700" : "text-gray-900"}`}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
