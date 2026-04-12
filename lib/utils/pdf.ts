import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) return;

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const imgWidth = canvas.width;
  const imgHeight = canvas.height;
  const ratio = Math.min(pdfWidth / imgWidth, (pdfHeight - 30) / imgHeight);
  const imgX = (pdfWidth - imgWidth * ratio) / 2;

  // Header
  pdf.setFillColor(37, 99, 235);
  pdf.rect(0, 0, pdfWidth, 12, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'bold');
  pdf.text('CalcBharat — Free Indian Financial Calculators', pdfWidth / 2, 8, { align: 'center' });

  // Content
  pdf.addImage(imgData, 'PNG', imgX, 14, imgWidth * ratio, imgHeight * ratio);

  // Footer
  pdf.setFontSize(8);
  pdf.setTextColor(107, 114, 128);
  pdf.setFont('helvetica', 'normal');
  pdf.text(
    'Disclaimer: For reference only. Consult a financial advisor before making decisions. calcbharat.com',
    pdfWidth / 2,
    pdfHeight - 4,
    { align: 'center' }
  );

  pdf.save(filename);
}
