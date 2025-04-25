import { IEntry } from '../interfaces/entry';
import { IServicio } from '../interfaces/servicio';
import html2canvas from 'html2canvas';

/**
 * Genera el HTML del contenido del voucher.
 */
export const generateVoucher = async ( data: IEntry, services: IServicio[], type: string ) => {
  // 1. Construir HTML
  const container = document.createElement('div');
  container.id                = 'voucher';
  container.style.width       = '58mm';
  container.style.fontFamily  = 'monospace';
  container.style.fontSize    = '14px';
  container.style.padding     = '5px';

  // 2. Lista de servicios en HTML
  const serviciosHTML = services
    .map(
      (s: IServicio) =>
        `<div style="display: flex; justify-content: space-between;">
          <span>${ s.nombre_servicio }</span><span>$${s.valor_servicio.toLocaleString()}</span>
        </div>`
    ).join('');

  const total = services.reduce((sum, s) => sum + s.valor_servicio, 0);

//   const flag = type;
//   const tipoPago =
//     flag === 'SALIDA'
//       ? `MÉTODO DE PAGO: ${data.tipo_pago.toUpperCase()}`
//       : flag === 'INGRESO'
//       ? ''
//       : '';
  container.innerHTML = `
    <div class="ticket">
      <div style="text-align:center">
        <img src="iconos-botones/icono-voucher.png" alt="Logo" style="width:130px; margin:10px auto; display:block; padding-top: 15px;" />
        <strong>Lavadero Colombianito</strong><br/>
        NIT: 27220560 <br/>
        Carrera 16 No. 21-39 </br> Pasto - Nariño <br/>
        Tel: 3216417934
        Fecha: ${new Date().toLocaleDateString('es-ES')}<br/>
      </div>

      <hr />
      <div style="text-align:center; font-size: 30px; padding: 5px; font-weight:bold" ><strong>INGRESO DE VEHÍCULO</strong><br/></div>
      <div style="text-align:center; font-size: 24px; padding: 5px;" ><strong>PLACA: ${data.placa}</strong><br/></div>

      <div>
        Tipo: ${data.Vehicle.tipo}
        Marca: ${data.Vehicle.marca}
        Línea: ${data.Vehicle.linea}
        Propietario: ${data.Vehicle.nombre_prop}<br/>
        
      </div>

      <div style="margin:10px 0; border-top:1px dashed #000; border-bottom:1px dashed #000; padding-top: 10px; padding-bottom: 10px;">
        ${serviciosHTML}
      </div>

      <div style="text-align:right; font-weight:bold">TOTAL: $${total.toLocaleString()}</div>

      <div style="text-align:center; margin-top:15px">
        *****************************<br/>
        Este documento de carácter informativo y no constituye una factura<br/>.<br/>
        .
        </div>
    </div>
  `;

  // 3. Agregar al DOM de forma temporal
  document.body.appendChild(container);

  // 4. Capturar y convertir a imagen
  // const canvas = await html2canvas(container);

  // Convertir el canvas a imagen en base64
  // const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
  // const rawbtUrl = `rawbt:data:image/png;base64,${imageBase64}`;

  // console.log("📄", imageBase64);
  // window.open(rawbtUrl);

  // 5. Quitar del DOM
  // document.body.removeChild(container);
  try {
    const canvas = await html2canvas(container);
    const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
    const rawbtUrl = `rawbt:data:image/png;base64,${imageBase64}`;
    window.location.href = rawbtUrl;
  } catch (error) {
    console.error('Error al generar la imagen del voucher:', error);
  } finally {
    // Limpiar el DOM
    document.body.removeChild(container);
  }
};
