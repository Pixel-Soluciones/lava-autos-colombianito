import jdPDF from 'jspdf';
import { autoTable } from 'jspdf-autotable'

export const generateTicket = (data: any, type: string) => {
    const doc = new jdPDF({
        orientation: 'landscape',
        unit: "cm",
        format: [14, 21.5],
    });

    // Agregar marca de agua con imagen
    doc.addImage('iconos-botones/water-Mark.png', 'PNG', 5, 3, 11, 8);
    
    // Encabezado
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("LAVA AUTOS COLOMBIANITO", 10.75, 2, { align: "center" });

    doc.setFontSize(16);
    doc.text(`REPORTE DE ${type}`, 10.75, 2.5, { align: "center" });

    doc.setFontSize(10);

    // FECHA
    doc.setFont("helvetica", "bold");
    doc.text("FECHA:", 2, 4);
    doc.setFont("helvetica", "normal");
    doc.text(`${new Date().toLocaleDateString()}`, 4, 4);

    // PLACA VEHÍCULO
    doc.setFont("helvetica", "bold");
    doc.text("PLACA VEHÍCULO:", 2, 4.5);
    doc.setFont("helvetica", "normal");
    doc.text("vehiculo.placa", 5.8, 4.5);

    // NOMBRE PROPIETARIO
    doc.setFont("helvetica", "bold");
    doc.text("NOMBRE PROPIETARIO:", 2, 5);
    doc.setFont("helvetica", "normal");
    doc.text("vehiculo.nombre_prop", 6.8, 5);

    // CONTACTO
    doc.setFont("helvetica", "bold");
    doc.text("CONTACTO:", 2, 5.5);
    doc.setFont("helvetica", "normal");
    doc.text("vehiculo.contacto", 5, 5.5);

    // Espaciado antes de la tabla
    let startY = 6;

    // Tabla de servicios
    const tableHead = [['SERVICIO', 'DESCRIPCIÓN', 'VALOR']];
    const tableBody =  [
        ['SERVICIO', 'DESCRIPCIÓN', 'VALOR'],
        ['SERVICIO2', 'DESCRIPCION2', 'VALOR2'],
        ['SERVICIO2', 'DESCRIPCION2', 'VALOR2'],
        ['SERVICIO3', 'DESCRIPCION3 es  muy karga porque así le gusta a zambrano y el se emociona cuando lo arrinconan en la mañana el pobre hombre ya se va a trabajar', 'VALOR3'],
    ]
    autoTable(doc, {
        startY,
        head: tableHead,
        body: tableBody,
    });

    // Posición del total después de la tabla
    let finalY = 13;
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL A PAGAR: $total`, 2, finalY);

    // Save the PDF
    doc.save("ticket.pdf");
}