'use client';

export async function exportToPdf(elementId: string, filename: string, orientation: 'portrait' | 'landscape' = 'landscape') {
  const element = document.getElementById(elementId);
  if (!element) throw new Error(`Elemento "${elementId}" no encontrado`);

  const html2canvas = (await import('html2canvas-pro')).default;
  const { jsPDF } = await import('jspdf');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({
    orientation,
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = orientation === 'landscape' ? 297 : 210;
  const pageHeight = orientation === 'landscape' ? 210 : 297;
  const margin = 10;
  const availableWidth = pageWidth - (margin * 2);
  const imgWidth = availableWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  if (imgHeight <= pageHeight - (margin * 2)) {
    pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
  } else {
    // Multi-page
    let yOffset = 0;
    const sliceHeight = ((pageHeight - margin * 2) / imgWidth) * canvas.width;

    while (yOffset < canvas.height) {
      if (yOffset > 0) pdf.addPage();

      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = Math.min(sliceHeight, canvas.height - yOffset);
      const ctx = sliceCanvas.getContext('2d')!;
      ctx.drawImage(canvas, 0, -yOffset);

      const sliceImg = sliceCanvas.toDataURL('image/png');
      const sliceImgHeight = (sliceCanvas.height * imgWidth) / sliceCanvas.width;
      pdf.addImage(sliceImg, 'PNG', margin, margin, imgWidth, sliceImgHeight);

      yOffset += sliceHeight;
    }
  }

  pdf.save(filename);
}

export async function exportMultiplePagesPdf(elementIds: string[], filename: string, orientation: 'portrait' | 'landscape' = 'landscape') {
  const html2canvas = (await import('html2canvas-pro')).default;
  const { jsPDF } = await import('jspdf');

  const pdf = new jsPDF({ orientation, unit: 'mm', format: 'a4' });
  const pageWidth = orientation === 'landscape' ? 297 : 210;
  const margin = 10;
  const availableWidth = pageWidth - (margin * 2);

  let pagesAdded = 0;

  for (let i = 0; i < elementIds.length; i++) {
    const element = document.getElementById(elementIds[i]);
    if (!element) continue;

    // Temporarily show hidden elements for rendering
    const wasHidden = element.classList.contains('hidden');
    if (wasHidden) element.classList.remove('hidden');

    if (pagesAdded > 0) pdf.addPage();

    const canvas = await html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' });
    const imgData = canvas.toDataURL('image/png');
    const imgHeight = (canvas.height * availableWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', margin, margin, availableWidth, imgHeight);
    pagesAdded++;

    // Restore hidden state
    if (wasHidden) element.classList.add('hidden');
  }

  if (pagesAdded === 0) throw new Error('No se encontraron elementos para exportar');

  pdf.save(filename);
}
