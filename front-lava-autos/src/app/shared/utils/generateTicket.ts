import jdPDF from 'jspdf';

export const generateTicket = () => {
    const doc = new jdPDF();
    
    // Set font size and styles
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Lava Autos Colombianito", 105, 20, { align: "center" });

    // Set font size and styles
    // Vehicle information
    doc.setFontSize(14);
    doc.text("🚗 Información del Vehículo", 20, 40);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Placa: vehiculo.placa`, 20, 50);
    doc.text(`Marca: vehiculo.marca`, 20, 60);
    doc.text(`Línea: vehiculo.linea`, 20, 70);
    doc.text(`Propietario: vehiculo.nombre_prop`, 20, 80);
    doc.text(`Contacto: vehiculo.contacto`, 20, 90);
    doc.text(`Clave: vehiculo.clave`, 20, 100);

    // servicios

    // Total amount
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total a pagar: $valorPagar.toLocaleString`, 20, 130 + 20);

    // Save the PDF
    doc.save("ticket.pdf");
}