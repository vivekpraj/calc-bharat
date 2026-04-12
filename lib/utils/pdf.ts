import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  // Temporarily force light mode for PDF capture
  const wasDark = document.documentElement.classList.contains("dark");
  if (wasDark) document.documentElement.classList.remove("dark");

  const canvas = await html2canvas(element, {
    scale: 1.5,
    useCORS: true,
    backgroundColor: '#ffffff',
    windowWidth: 900,         // force narrow layout so content isn't too wide
    logging: false,
  });

  // Restore dark mode
  if (wasDark) document.documentElement.classList.add("dark");

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pdfWidth  = pdf.internal.pageSize.getWidth();   // 210mm
  const pdfHeight = pdf.internal.pageSize.getHeight();  // 297mm

  const HEADER_H = 12; // mm
  const FOOTER_H = 8;  // mm
  const MARGIN    = 8; // mm side margins

  const contentWidth  = pdfWidth - MARGIN * 2;
  const contentHeight = pdfHeight - HEADER_H - FOOTER_H - 4; // usable per page

  // Scale: fit canvas width into content width
  const scale = contentWidth / canvas.width;
  const scaledPageHeight = contentHeight / scale; // canvas px per page

  const totalPages = Math.ceil(canvas.height / scaledPageHeight);

  for (let page = 0; page < totalPages; page++) {
    if (page > 0) pdf.addPage();

    // ── Header ────────────────────────────────────────────
    pdf.setFillColor(61, 64, 220); // brand-600
    pdf.rect(0, 0, pdfWidth, HEADER_H, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'bold');
    pdf.text('CalcBharat — Free Indian Financial Calculators', pdfWidth / 2, 8, { align: 'center' });

    // ── Slice canvas for this page ─────────────────────────
    const srcY      = page * scaledPageHeight;
    const srcHeight = Math.min(scaledPageHeight, canvas.height - srcY);

    const slice = document.createElement('canvas');
    slice.width  = canvas.width;
    slice.height = srcHeight;
    const ctx = slice.getContext('2d')!;
    ctx.drawImage(canvas, 0, -srcY);

    const imgData = slice.toDataURL('image/png');
    pdf.addImage(
      imgData, 'PNG',
      MARGIN,
      HEADER_H + 2,
      contentWidth,
      srcHeight * scale,
    );

    // ── Footer ─────────────────────────────────────────────
    pdf.setFontSize(7);
    pdf.setTextColor(156, 163, 175);
    pdf.setFont('helvetica', 'normal');
    pdf.text(
      `Disclaimer: For reference only. Consult a financial advisor before making decisions. calcbharat.com`,
      pdfWidth / 2,
      pdfHeight - 3,
      { align: 'center' },
    );
    pdf.text(
      `Page ${page + 1} of ${totalPages}`,
      pdfWidth - MARGIN,
      pdfHeight - 3,
      { align: 'right' },
    );
  }

  pdf.save(filename);
}
