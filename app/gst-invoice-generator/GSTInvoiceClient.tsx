"use client";
import { useState, useCallback } from "react";
import { Plus, Trash2, Download, Eye } from "lucide-react";
import { formatINR, amountInWords } from "@/lib/utils/format";
import Breadcrumb from "@/components/Breadcrumb";

interface LineItem {
  id: string;
  description: string;
  hsn: string;
  qty: number;
  unit: string;
  rate: number;
  gstRate: number;
}

interface InvoiceData {
  sellerName: string;
  sellerGSTIN: string;
  sellerAddress: string;
  sellerState: string;
  sellerPhone: string;
  sellerEmail: string;
  buyerName: string;
  buyerGSTIN: string;
  buyerAddress: string;
  buyerState: string;
  invoiceNo: string;
  invoiceDate: string;
  dueDate: string;
  poNumber: string;
  items: LineItem[];
  discount: number;
  terms: string;
  bankName: string;
  accountNo: string;
  ifscCode: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat",
  "Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra",
  "Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu",
  "Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Delhi","Jammu & Kashmir",
];

const GST_RATES = [0, 5, 12, 18, 28];

function uid(): string {
  return Math.random().toString(36).slice(2, 9);
}

function newItem(): LineItem {
  return { id: uid(), description: "", hsn: "", qty: 1, unit: "Nos", rate: 0, gstRate: 18 };
}

function calcTotals(items: LineItem[], discount: number, interState: boolean) {
  const subtotal = items.reduce((s, i) => s + i.qty * i.rate, 0);
  const discountAmt = (subtotal * discount) / 100;
  const taxableAmount = subtotal - discountAmt;

  const gstBreakdown = items.reduce((acc, item) => {
    const taxable = item.qty * item.rate * (1 - discount / 100);
    const gstAmt = (taxable * item.gstRate) / 100;
    const key = item.gstRate;
    if (!acc[key]) acc[key] = { rate: key, taxable: 0, cgst: 0, sgst: 0, igst: 0 };
    acc[key].taxable += taxable;
    if (interState) acc[key].igst += gstAmt;
    else { acc[key].cgst += gstAmt / 2; acc[key].sgst += gstAmt / 2; }
    return acc;
  }, {} as Record<number, { rate: number; taxable: number; cgst: number; sgst: number; igst: number }>);

  const totalGST = Object.values(gstBreakdown).reduce((s, g) => s + g.cgst + g.sgst + g.igst, 0);
  const grandTotal = taxableAmount + totalGST;

  return { subtotal, discountAmt, taxableAmount, gstBreakdown: Object.values(gstBreakdown), totalGST, grandTotal };
}

function InvoicePreview({ data, interState }: { data: InvoiceData; interState: boolean }) {
  const totals = calcTotals(data.items, data.discount, interState);

  return (
    <div id="invoice-preview" className="bg-white p-8 min-h-[297mm] font-sans text-xs text-gray-800" style={{ width: "210mm", maxWidth: "100%" }}>
      {/* Header */}
      <div className="flex justify-between items-start mb-6 pb-4 border-b-2 border-blue-600">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">{data.sellerName || "Your Business Name"}</h1>
          <p className="text-gray-500 mt-0.5 whitespace-pre-line">{data.sellerAddress}</p>
          {data.sellerPhone && <p className="text-gray-500">Ph: {data.sellerPhone}</p>}
          {data.sellerEmail && <p className="text-gray-500">{data.sellerEmail}</p>}
          {data.sellerGSTIN && <p className="font-semibold mt-1">GSTIN: {data.sellerGSTIN}</p>}
        </div>
        <div className="text-right">
          <div className="inline-block border-2 border-blue-600 rounded-lg px-4 py-2">
            <p className="text-base font-bold text-blue-700 uppercase tracking-wider">Tax Invoice</p>
          </div>
          <div className="mt-3 text-right">
            <p><span className="text-gray-500">Invoice No:</span> <strong>{data.invoiceNo}</strong></p>
            <p><span className="text-gray-500">Date:</span> <strong>{data.invoiceDate}</strong></p>
            {data.dueDate && <p><span className="text-gray-500">Due Date:</span> <strong>{data.dueDate}</strong></p>}
            {data.poNumber && <p><span className="text-gray-500">PO No:</span> {data.poNumber}</p>}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="font-semibold text-gray-700 text-xs uppercase tracking-wider mb-1">Bill To</p>
          <p className="font-bold text-sm">{data.buyerName || "Customer Name"}</p>
          {data.buyerGSTIN && <p className="text-gray-600">GSTIN: {data.buyerGSTIN}</p>}
          <p className="text-gray-600 whitespace-pre-line">{data.buyerAddress}</p>
          {data.buyerState && <p className="text-gray-600">State: {data.buyerState}</p>}
        </div>
        <div className="bg-blue-50 rounded-lg p-3">
          <p className="font-semibold text-blue-700 text-xs uppercase tracking-wider mb-1">Seller</p>
          <p className="font-bold text-sm">{data.sellerName || "Your Business"}</p>
          <p className="text-gray-600">{data.sellerState}</p>
          <p className="text-xs mt-2 text-gray-500">Type: {interState ? "Inter-state (IGST)" : "Intra-state (CGST+SGST)"}</p>
        </div>
      </div>

      {/* Line items table */}
      <table className="w-full mb-4 border-collapse text-xs">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-2 py-2 text-left">#</th>
            <th className="px-2 py-2 text-left">Description</th>
            <th className="px-2 py-2 text-center">HSN</th>
            <th className="px-2 py-2 text-center">Qty</th>
            <th className="px-2 py-2 text-center">Unit</th>
            <th className="px-2 py-2 text-right">Rate (₹)</th>
            <th className="px-2 py-2 text-center">GST%</th>
            <th className="px-2 py-2 text-right">Amount (₹)</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item, i) => (
            <tr key={item.id} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="px-2 py-2 border-b border-gray-100">{i + 1}</td>
              <td className="px-2 py-2 border-b border-gray-100">{item.description || "—"}</td>
              <td className="px-2 py-2 border-b border-gray-100 text-center">{item.hsn || "—"}</td>
              <td className="px-2 py-2 border-b border-gray-100 text-center">{item.qty}</td>
              <td className="px-2 py-2 border-b border-gray-100 text-center">{item.unit}</td>
              <td className="px-2 py-2 border-b border-gray-100 text-right">{item.rate.toLocaleString("en-IN")}</td>
              <td className="px-2 py-2 border-b border-gray-100 text-center">{item.gstRate}%</td>
              <td className="px-2 py-2 border-b border-gray-100 text-right font-semibold">{(item.qty * item.rate).toLocaleString("en-IN", { maximumFractionDigits: 2 })}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals + GST summary */}
      <div className="flex gap-4 mb-6">
        {/* GST Summary */}
        <div className="flex-1">
          <table className="w-full text-xs border border-gray-200 rounded-lg overflow-hidden">
            <thead><tr className="bg-gray-100"><th className="px-2 py-1.5 text-left">GST Rate</th><th className="px-2 py-1.5 text-right">Taxable</th>
              {!interState && <><th className="px-2 py-1.5 text-right">CGST</th><th className="px-2 py-1.5 text-right">SGST</th></>}
              {interState && <th className="px-2 py-1.5 text-right">IGST</th>}
            </tr></thead>
            <tbody>
              {totals.gstBreakdown.map((g) => (
                <tr key={g.rate} className="border-t border-gray-100">
                  <td className="px-2 py-1">{g.rate}%</td>
                  <td className="px-2 py-1 text-right">{g.taxable.toFixed(2)}</td>
                  {!interState && <><td className="px-2 py-1 text-right">{g.cgst.toFixed(2)}</td><td className="px-2 py-1 text-right">{g.sgst.toFixed(2)}</td></>}
                  {interState && <td className="px-2 py-1 text-right">{g.igst.toFixed(2)}</td>}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="w-56">
          <div className="space-y-1">
            {[
              { label: "Subtotal", value: totals.subtotal },
              ...(totals.discountAmt > 0 ? [{ label: `Discount (${data.discount}%)`, value: -totals.discountAmt }] : []),
              { label: "Taxable Amount", value: totals.taxableAmount },
              ...(interState ? [{ label: "IGST", value: totals.totalGST }] : [
                { label: "CGST", value: totals.totalGST / 2 },
                { label: "SGST", value: totals.totalGST / 2 },
              ]),
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-xs py-0.5">
                <span className="text-gray-600">{row.label}</span>
                <span>{row.value.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-sm pt-2 border-t-2 border-blue-600">
              <span>Grand Total</span>
              <span className="text-blue-700">{formatINR(totals.grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Amount in words */}
      <div className="bg-blue-50 rounded-lg p-3 mb-4 text-xs">
        <span className="font-semibold">Amount in Words: </span>
        <span className="italic">{amountInWords(Math.round(totals.grandTotal))}</span>
      </div>

      {/* Bank Details + Terms */}
      <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
        {(data.bankName || data.accountNo) && (
          <div>
            <p className="font-semibold text-gray-700 mb-1">Bank Details</p>
            {data.bankName && <p>Bank: {data.bankName}</p>}
            {data.accountNo && <p>Account: {data.accountNo}</p>}
            {data.ifscCode && <p>IFSC: {data.ifscCode}</p>}
          </div>
        )}
        <div className={data.bankName || data.accountNo ? "" : "col-span-2"}>
          <p className="font-semibold text-gray-700 mb-1">Terms & Conditions</p>
          <p className="text-gray-500 whitespace-pre-line">{data.terms || "1. Payment due within 30 days.\n2. Goods once sold will not be taken back.\n3. All disputes subject to local jurisdiction."}</p>
        </div>
      </div>

      {/* Signature */}
      <div className="mt-8 flex justify-end">
        <div className="text-center">
          <div className="w-32 h-14 border-b border-gray-400 mb-1"></div>
          <p className="text-xs text-gray-600">Authorised Signatory</p>
          <p className="text-xs font-semibold">{data.sellerName || "Your Business"}</p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200 text-center text-gray-400 text-xs">
        Generated with CalcBharat.com — Free GST Invoice Generator
      </div>
    </div>
  );
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3 pb-1 border-b border-gray-100">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-3">
      <label className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-400 bg-white";
const selectCls = `${inputCls}`;

export default function GSTInvoiceClient() {
  const today = new Date().toISOString().slice(0, 10);
  const [showPreview, setShowPreview] = useState(false);

  const [data, setData] = useState<InvoiceData>({
    sellerName: "", sellerGSTIN: "", sellerAddress: "", sellerState: "Maharashtra",
    sellerPhone: "", sellerEmail: "",
    buyerName: "", buyerGSTIN: "", buyerAddress: "", buyerState: "Maharashtra",
    invoiceNo: "INV-001", invoiceDate: today, dueDate: "", poNumber: "",
    items: [newItem()],
    discount: 0,
    terms: "1. Payment due within 30 days.\n2. Goods once sold will not be taken back.\n3. All disputes subject to local jurisdiction.",
    bankName: "", accountNo: "", ifscCode: "",
  });

  const interState = data.sellerState !== data.buyerState;

  const set = useCallback(<K extends keyof InvoiceData>(key: K, value: InvoiceData[K]) => {
    setData((prev) => ({ ...prev, [key]: value }));
  }, []);

  const setItem = useCallback((id: string, key: keyof LineItem, value: string | number) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => item.id === id ? { ...item, [key]: value } : item),
    }));
  }, []);

  const addItem = () => setData((prev) => ({ ...prev, items: [...prev.items, newItem()] }));
  const removeItem = (id: string) => setData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) }));

  const downloadPDF = async () => {
    const el = document.getElementById("invoice-preview");
    if (!el) return;
    const html2canvas = (await import("html2canvas")).default;
    const jsPDF = (await import("jspdf")).default;
    const canvas = await html2canvas(el, { scale: 2, useCORS: true, backgroundColor: "#fff" });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`invoice-${data.invoiceNo}-${today}.pdf`);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "GST Tools" }, { label: "GST Invoice Generator" }]} />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">GST Invoice Generator</h1>
          <p className="text-gray-500 text-sm mt-1">Create professional GST invoices with live preview. Download as PDF instantly.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowPreview(!showPreview)} className="lg:hidden flex items-center gap-1.5 px-3 py-2 border border-gray-200 text-gray-700 text-sm font-medium rounded-lg">
            <Eye className="w-4 h-4" />{showPreview ? "Edit" : "Preview"}
          </button>
          <button onClick={downloadPDF} className="flex items-center gap-1.5 px-4 py-2 bg-brand-600 text-white text-sm font-semibold rounded-lg hover:bg-brand-700 transition-colors">
            <Download className="w-4 h-4" />Download PDF
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Form Panel */}
        <div className={`w-full lg:w-[420px] shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 overflow-y-auto ${showPreview ? "hidden lg:block" : ""}`}>
          <FormSection title="Your Business">
            <Field label="Business Name *"><input className={inputCls} value={data.sellerName} onChange={(e) => set("sellerName", e.target.value)} placeholder="ABC Traders" /></Field>
            <Field label="GSTIN"><input className={inputCls} value={data.sellerGSTIN} onChange={(e) => set("sellerGSTIN", e.target.value)} placeholder="27AAAAA0000A1Z5" /></Field>
            <Field label="Address"><textarea className={inputCls} rows={2} value={data.sellerAddress} onChange={(e) => set("sellerAddress", e.target.value)} placeholder="Street, City, PIN" /></Field>
            <Field label="State"><select className={selectCls} value={data.sellerState} onChange={(e) => set("sellerState", e.target.value)}>{INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Phone"><input className={inputCls} value={data.sellerPhone} onChange={(e) => set("sellerPhone", e.target.value)} /></Field>
              <Field label="Email"><input className={inputCls} value={data.sellerEmail} onChange={(e) => set("sellerEmail", e.target.value)} /></Field>
            </div>
          </FormSection>

          <FormSection title="Bill To">
            <Field label="Customer Name *"><input className={inputCls} value={data.buyerName} onChange={(e) => set("buyerName", e.target.value)} placeholder="XYZ Pvt Ltd" /></Field>
            <Field label="GSTIN (optional)"><input className={inputCls} value={data.buyerGSTIN} onChange={(e) => set("buyerGSTIN", e.target.value)} /></Field>
            <Field label="Address"><textarea className={inputCls} rows={2} value={data.buyerAddress} onChange={(e) => set("buyerAddress", e.target.value)} /></Field>
            <Field label="State"><select className={selectCls} value={data.buyerState} onChange={(e) => set("buyerState", e.target.value)}>{INDIAN_STATES.map((s) => <option key={s}>{s}</option>)}</select></Field>
            {interState && <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-700">Inter-state transaction — IGST will apply</div>}
          </FormSection>

          <FormSection title="Invoice Details">
            <div className="grid grid-cols-2 gap-2">
              <Field label="Invoice No"><input className={inputCls} value={data.invoiceNo} onChange={(e) => set("invoiceNo", e.target.value)} /></Field>
              <Field label="Invoice Date"><input type="date" className={inputCls} value={data.invoiceDate} onChange={(e) => set("invoiceDate", e.target.value)} /></Field>
              <Field label="Due Date"><input type="date" className={inputCls} value={data.dueDate} onChange={(e) => set("dueDate", e.target.value)} /></Field>
              <Field label="PO Number"><input className={inputCls} value={data.poNumber} onChange={(e) => set("poNumber", e.target.value)} /></Field>
            </div>
          </FormSection>

          <FormSection title="Line Items">
            {data.items.map((item, i) => (
              <div key={item.id} className="border border-gray-100 rounded-xl p-3 mb-3 bg-gray-50">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-gray-500">Item {i + 1}</span>
                  {data.items.length > 1 && (
                    <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                  )}
                </div>
                <Field label="Description"><input className={inputCls} value={item.description} onChange={(e) => setItem(item.id, "description", e.target.value)} placeholder="Service or product name" /></Field>
                <div className="grid grid-cols-2 gap-2">
                  <Field label="HSN/SAC"><input className={inputCls} value={item.hsn} onChange={(e) => setItem(item.id, "hsn", e.target.value)} /></Field>
                  <Field label="Unit"><input className={inputCls} value={item.unit} onChange={(e) => setItem(item.id, "unit", e.target.value)} /></Field>
                  <Field label="Qty"><input type="number" className={inputCls} value={item.qty} onChange={(e) => setItem(item.id, "qty", parseFloat(e.target.value) || 0)} min={0} /></Field>
                  <Field label="Rate (₹)"><input type="number" className={inputCls} value={item.rate} onChange={(e) => setItem(item.id, "rate", parseFloat(e.target.value) || 0)} min={0} /></Field>
                </div>
                <Field label="GST Rate">
                  <div className="flex gap-1 flex-wrap">
                    {GST_RATES.map((r) => (
                      <button key={r} onClick={() => setItem(item.id, "gstRate", r)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${item.gstRate === r ? "bg-brand-600 text-white" : "bg-white border border-gray-200 text-gray-600 hover:bg-brand-50"}`}>
                        {r}%
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
            ))}
            <button onClick={addItem} className="flex items-center gap-1.5 text-sm text-brand-600 font-semibold hover:underline">
              <Plus className="w-4 h-4" />Add Line Item
            </button>
          </FormSection>

          <FormSection title="Discount & Bank Details">
            <Field label="Discount (%)"><input type="number" className={inputCls} value={data.discount} onChange={(e) => set("discount", parseFloat(e.target.value) || 0)} min={0} max={100} /></Field>
            <div className="grid grid-cols-2 gap-2">
              <Field label="Bank Name"><input className={inputCls} value={data.bankName} onChange={(e) => set("bankName", e.target.value)} /></Field>
              <Field label="Account No"><input className={inputCls} value={data.accountNo} onChange={(e) => set("accountNo", e.target.value)} /></Field>
              <Field label="IFSC Code"><input className={inputCls} value={data.ifscCode} onChange={(e) => set("ifscCode", e.target.value)} /></Field>
            </div>
          </FormSection>

          <FormSection title="Terms & Conditions">
            <textarea className={inputCls} rows={4} value={data.terms} onChange={(e) => set("terms", e.target.value)} />
          </FormSection>
        </div>

        {/* Preview Panel */}
        <div className={`flex-1 ${!showPreview ? "hidden lg:block" : ""}`}>
          <div className="sticky top-20">
            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm bg-gray-100 p-4">
              <InvoicePreview data={data} interState={interState} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
