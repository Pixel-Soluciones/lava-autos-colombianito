import jdPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { IServicio } from '../interfaces/servicio';

export const generateTicket = (data: any, services: any, type: string) => {
  const doc = new jdPDF({
    orientation: 'landscape',
    unit: 'cm',
    format: [14, 21.5],
  });

  const total = services.reduce(
    (sum: number, service: { valor_servicio: string }) =>
      sum + (parseFloat(service.valor_servicio) || 0),
    0
  );

  // Agregar marca de agua con imagen
  doc.addImage(
    'iconos-botones/guatermarc.jpg',
    'jpeg',
    3,
    1,
    14,
    11,
    undefined,
    'FAST'
  );

  // Encabezado
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('LAVA AUTOS COLOMBIANITO', 10.75, 2, { align: 'center' });

  doc.setFontSize(16);
  doc.text(`REPORTE DE ${type}`, 10.75, 3, { align: 'center' });

  doc.setFontSize(10);

  // FECHA
  doc.setFont('helvetica', 'bold');
  doc.text('FECHA:', 2, 4);
  doc.setFont('helvetica', 'normal');
  doc.text(`${new Date().toLocaleDateString()}`, 4, 4);

  // PLACA VEHÍCULO
  doc.setFont('helvetica', 'bold');
  doc.text('PLACA VEHÍCULO:', 2, 4.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.placa}`, 5.8, 4.5);

  // NOMBRE PROPIETARIO
  doc.setFont('helvetica', 'bold');
  doc.text('NOMBRE PROPIETARIO:', 2, 5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.Vehicle.nombre_prop}`, 6.8, 5);

  // CONTACTO
  doc.setFont('helvetica', 'bold');
  doc.text('CONTACTO:', 2, 5.5);
  doc.setFont('helvetica', 'normal');
  doc.text(`${data.Vehicle.contacto}`, 5, 5.5);

  // Espaciado antes de la tabla
  let startY = 6;

  // Tabla de servicios
  const tableHead = [['SERVICIO', 'DESCRIPCIÓN', 'VALOR']];
  const tableBody = services.map(
    (service: {
      nombre_servicio: any;
      descrip_servicio: any;
      valor_servicio: any;
    }) => [
      service.nombre_servicio || 'Sin nombre',
      service.descrip_servicio || 'Sin descripción',
      service.valor_servicio
        ? service.valor_servicio.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
          })
        : 'N/A',
    ]
  );

  autoTable(doc, {
    startY,
    head: tableHead,
    body: tableBody,
  });

  // Posición del total después de la tabla
  let finalY = 13;
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  const formattedTotal = total.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  });
  if (type == 'SALIDA') {
    doc.text(`MÉTODO DE PAGO: ${data.tipo_pago}`, 1, 12.5);
  }
  doc.text(`TOTAL A PAGAR: ${formattedTotal}`, 1, finalY);

  // Save the PDF
  doc.autoPrint({ variant: 'non-conform' });
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const printWindow = window.open(pdfUrl, '_blank');

  if (printWindow) {
    printWindow.onload = () => {
      printWindow.print();
    };
  } else {
    console.error('No se pudo abrir la ventana de impresión.');
  }
};
