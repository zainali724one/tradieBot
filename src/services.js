import { openLink } from "@telegram-apps/sdk";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

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
      allowTaint: true, // If you're using external images
    });

    if (!canvas) {
      throw new Error("Canvas generation failed");
    }

    // const imgData = canvas.toDataURL("image/png");
    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    if (!imgData || imgData.length < 100) {
      // Simple check for valid data
      throw new Error("Invalid image data generated");
    }

    // Calculate dimensions maintaining aspect ratio
    const imgWidth = 430;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF("p", "pt", [imgWidth, imgHeight]);
    // pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");
    pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

    return pdf.output("blob");
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error; // Re-throw to handle in the calling code
  }
};

// import { PDFDocument, rgb } from 'pdf-lib';
// import { toBlob } from 'html-to-image';

// export const handleGeneratePdf = async (pdfRef) => {
//   if (!pdfRef.current) {
//     throw new Error("PDF ref is not available");
//   }

//   try {
//     // 1. Create a new PDF document
//     const pdfDoc = await PDFDocument.create();

//     // 2. Get HTML content dimensions
//     const width = pdfRef.current.offsetWidth;
//     const height = pdfRef.current.offsetHeight;

//     // 3. Add a page with matching dimensions
//     const page = pdfDoc.addPage([width, height]);

//     // 4. Extract text and links from the HTML
//     const textElements = pdfRef.current.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6');
//     const linkElements = pdfRef.current.querySelectorAll('a');

//     // 5. Add text content (selectable)
//     textElements.forEach(el => {
//       const rect = el.getBoundingClientRect();
//       page.drawText(el.textContent, {
//         x: rect.left,
//         y: height - rect.bottom, // PDF coordinates start from bottom
//         size: parseInt(window.getComputedStyle(el).fontSize) || 12,
//         color: rgb(0, 0, 0),
//       });
//     });

//     // 6. Add clickable links
//     linkElements.forEach(el => {
//       const rect = el.getBoundingClientRect();
//       page.drawText(el.textContent, {
//         x: rect.left,
//         y: height - rect.bottom,
//         size: parseInt(window.getComputedStyle(el).fontSize) || 12,
//         color: rgb(0, 0, 1),
//         link: el.href,
//       });
//     });

//     // 7. Convert to Blob
//     const pdfBytes = await pdfDoc.save();
//     return new Blob([pdfBytes], { type: 'application/pdf' });

//   } catch (error) {
//     console.error("PDF generation error:", error);
//     throw error;
//   }
// };

// import { PDFDocument, rgb } from 'pdf-lib';
// import html2canvas from 'html2canvas-pro';

// export const handleGeneratePdf = async (pdfRef) => {
//   if (!pdfRef.current) {
//     throw new Error("PDF ref is not available");
//   }

//   try {
//     // 1. Capture component as image
//     const canvas = await html2canvas(pdfRef.current, {
//       scale: 2,
//       useCORS: true,
//       logging: true,
//       allowTaint: true
//     });

//     // 2. Create PDF
//     const pdfDoc = await PDFDocument.create();
//     const imgData = canvas.toDataURL('image/png');

//     // 3. Calculate dimensions
//     const imgWidth = canvas.width;
//     const imgHeight = canvas.height;
//     const page = pdfDoc.addPage([imgWidth, imgHeight]);

//     // 4. Embed the image
//     const image = await pdfDoc.embedPng(imgData);
//     page.drawImage(image, {
//       x: 0,
//       y: 0,
//       width: imgWidth,
//       height: imgHeight,
//     });

//     // 5. Add invisible text layer for selectable text
//     const textElements = pdfRef.current.querySelectorAll('p, span, h1, h2, h3, h4, h5, h6, a');
//     textElements.forEach(el => {
//       const rect = el.getBoundingClientRect();
//       const text = el.textContent;
//       const fontSize = parseInt(window.getComputedStyle(el).fontSize) || 12;

//       page.drawText(text, {
//         x: rect.left,
//         y: imgHeight - rect.bottom,
//         size: fontSize,
//         color: rgb(0, 0, 0, 0.01), // Nearly transparent
//       });

//       // Make links clickable
//       if (el.tagName === 'A') {
//         page.drawRectangle({
//           x: rect.left,
//           y: imgHeight - rect.bottom - fontSize,
//           width: rect.width,
//           height: fontSize,
//           color: rgb(0, 0, 0, 0), // Fully transparent
//           borderWidth: 0,
//           link: el.href
//         });
//       }
//     });

//     // 6. Return as Blob
//     const pdfBytes = await pdfDoc.save();
//     return new Blob([pdfBytes], { type: 'application/pdf' });

//   } catch (error) {
//     console.error("PDF generation error:", error);
//     throw error;
//   }
// };

// import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

// export const handleGeneratePdf = async (pdfRef) => {
//   if (!pdfRef.current) {
//     throw new Error("PDF ref is not available");
//   }

//   try {
//     // 1️⃣ Wait for DOM updates from props/state
//     await new Promise(resolve => requestAnimationFrame(resolve));

//     // 2️⃣ Create PDF
//     const pdfDoc = await PDFDocument.create();
//     const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

//     // 3️⃣ Deep clone for measurement
//     const clone = pdfRef.current.cloneNode(true);
//     clone.style.visibility = 'hidden';
//     clone.style.position = 'absolute';
//     clone.style.left = '-9999px';
//     document.body.appendChild(clone);

//     // 4️⃣ Wait for all images in the clone to load
//     const images = clone.querySelectorAll('img');
//     await Promise.all(
//       Array.from(images).map(img => {
//         if (img.complete) return Promise.resolve();
//         return new Promise(res => {
//           img.onload = img.onerror = res;
//         });
//       })
//     );

//     // 5️⃣ A4 page dimensions
//     const page = pdfDoc.addPage([595.28, 841.89]);
//     const contentRect = clone.getBoundingClientRect();
//     const scale = Math.min(
//       595.28 / contentRect.width,
//       841.89 / contentRect.height
//     );

//     // 6️⃣ Process node recursively
//     const processNode = async (node) => {
//       if (node.nodeType !== Node.ELEMENT_NODE) return;

//       try {
//         const rect = node.getBoundingClientRect();
//         const styles = window.getComputedStyle(node);

//         // Convert DOM coords → PDF coords
//         const x = (rect.left - contentRect.left) * scale;
//         const y = 841.89 - (rect.bottom - contentRect.top) * scale;

//         // 📌 Draw images
//         if (node.tagName === 'IMG' && node.src) {
//           try {
//             const imgBytes = await fetch(node.src, { mode: 'cors' }).then(res =>
//               res.arrayBuffer()
//             );
//             const ext = node.src.split('.').pop().toLowerCase();
//             const embeddedImg =
//               ext === 'png'
//                 ? await pdfDoc.embedPng(imgBytes)
//                 : await pdfDoc.embedJpg(imgBytes);

//             page.drawImage(embeddedImg, {
//               x,
//               y,
//               width: rect.width * scale,
//               height: rect.height * scale,
//             });
//           } catch (err) {
//             console.warn('Image skipped due to error:', node.src, err);
//           }
//         }

//         // 📌 Draw all visible text
//         const text = node.innerText || node.textContent;
//         if (text && text.trim()) {
//           page.drawText(text.trim(), {
//             x,
//             y,
//             size: (parseInt(styles.fontSize) || 12) * scale,
//             font,
//             color: rgb(0, 0, 0),
//           });
//         }

//         // Recursively process children
//         for (const child of node.childNodes) {
//           await processNode(child);
//         }
//       } catch (error) {
//         console.warn('Skipping node due to error:', node, error);
//       }
//     };

//     // 7️⃣ Render everything
//     await processNode(clone);
//     document.body.removeChild(clone);

//     // 8️⃣ Return PDF blob
//     const pdfBytes = await pdfDoc.save();
//     return new Blob([pdfBytes], { type: 'application/pdf' });

//   } catch (error) {
//     console.error("PDF generation error:", error);
//     throw error;
//   }
// };

export const isCurrentPage = (route, currentRoute) => {
  return route === currentRoute;
};

export const handleOpenExternalLink = (link) => {
  if (openLink.isAvailable()) {
    openLink(link, {
      tryBrowser: "chrome", // or 'safari' on iOS
      tryInstantView: false,
    });
  } else {
    // Fallback if openLink isn't available
    window.open(link, "_blank");
  }
};

export const getSheetId = (url) => {
  return url.split("/d/")[1].split("/")[0];
};
