
import { openLink } from '@telegram-apps/sdk';
import html2canvas from 'html2canvas-pro';
import jsPDF from 'jspdf'



export const handleGeneratePdf = async (pdfRef) => {
    if (!pdfRef.current) {
        throw new Error("PDF ref is not available");
    }

    try {
        // Convert to canvas
        const canvas = await html2canvas(pdfRef.current, {
            scale: 2,
            useCORS: true,
            logging: true, // Add logging to debug
            allowTaint: true // If you're using external images
        });

        if (!canvas) {
            throw new Error("Canvas generation failed");
        }

        const imgData = canvas.toDataURL('image/png');
        if (!imgData || imgData.length < 100) { // Simple check for valid data
            throw new Error("Invalid image data generated");
        }

        // Calculate dimensions maintaining aspect ratio
        const imgWidth = 430;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF('p', 'pt', [imgWidth, imgHeight]);
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight, undefined, 'FAST');

        return pdf.output('blob');
    } catch (error) {
        console.error("PDF generation error:", error);
        throw error; // Re-throw to handle in the calling code
    }
};
export const isCurrentPage = (route, currentRoute) => {
  return route === currentRoute;
};



export const handleOpenExternalLink = (link) => {
  if (openLink.isAvailable()){
    openLink(link, {
      tryBrowser: 'chrome', // or 'safari' on iOS
      tryInstantView: false,
    });
  } else {
    // Fallback if openLink isn't available
    window.open(link, '_blank');
  }
};




