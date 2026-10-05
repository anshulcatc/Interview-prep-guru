import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ResumeData } from '../data/resumeTypes';

/**
 * Generates and downloads a clean, professional PDF from the resume preview element.
 */
export async function downloadResumePDF(
  elementId: string,
  filename: string = 'Resume.pdf'
): Promise<boolean> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element #${elementId} not found for PDF export.`);
    // Fallback to window.print()
    window.print();
    return false;
  }

  try {
    // Render element into canvas with high scale for retina print quality
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1024,
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Multi-page support if resume exceeds single page
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;
    }

    const cleanFilename = filename.endsWith('.pdf') ? filename : `${filename}.pdf`;
    pdf.save(cleanFilename);
    return true;
  } catch (err) {
    console.error('jsPDF generation failed, falling back to browser print:', err);
    window.print();
    return false;
  }
}

/**
 * Triggers standard browser print dialog specifically styled for clean vector resume print
 */
export function printResume(): void {
  window.print();
}

/**
 * Exports resume data as a structured JSON file for backup and portability
 */
export function exportResumeJSON(resume: ResumeData): void {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `${resume.name.replace(/\s+/g, '_')}_data.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}
