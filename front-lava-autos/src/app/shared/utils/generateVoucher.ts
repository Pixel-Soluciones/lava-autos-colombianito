import { IEntry } from '../interfaces/entry';
import { IServicio } from '../interfaces/servicio';
import html2canvas from 'html2canvas';

/**
 * Genera el HTML del contenido del voucher.
 */
export const generateVoucher = async (
  data: IEntry,
  services: IServicio[],
  type: string
) => {
  const container = document.createElement('div');
  container.id = 'voucher';
  container.style.width = '58mm';
  container.style.fontFamily = 'monospace';
  container.style.fontSize = '12px';
  container.style.padding = '5px';

  const serviciosHTML = services
    .map(
      (s: IServicio) =>
        `<div style="display: flex; justify-content: space-between;">
          <span>${
            s.nombre_servicio
          }</span><span>$${s.valor_servicio.toLocaleString()}</span>
        </div>`
    )
    .join('');

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
        Carrera 16 #21-39 </br> Pasto - Nariño <br/>
        Tel: 3216417934<br/>
        Fecha: ${new Date().toLocaleDateString('es-ES')}<br/>
      </div>

      <hr />
      <div style="text-align:center; font-size: 18px; font-weight:bold" ><strong>INGRESO DE VEHÍCULO</strong><br/></div>
      <div style="display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
          font-size: 20px;
          margin: 10px;
        ">
          <strong>PLACA: ${data.placa}</strong>
      </div>

      <div style="margin: 10px;">
        Tipo: ${data.Vehicle.tipo}<br/>
        Marca: ${data.Vehicle.marca}<br/>
        Línea: ${data.Vehicle.linea}<br/>
        Propietario: ${data.Vehicle.nombre_prop}<br/>        
      </div>

      <div style="margin:5px; border-top:1px dashed #000; border-bottom:1px dashed #000; padding-top: 10px; padding-bottom: 5px;">
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

  document.body.appendChild(container);
  try {
    const canvas = await html2canvas(container);
    const imageBase64 = canvas.toDataURL('image/png').split(',')[1];
    const rawbtUrl = `rawbt:data:image/png;base64,${imageBase64}`;
    const imageFull = `data:image/png;base64,${imageBase64}`;

    const isMobile = /Android/i.test(navigator.userAgent);

    if (isMobile) {
      // En móvil, usar rawbt
      window.location.href = rawbtUrl;
    } else {
      // En PC, abrir en nueva pestaña
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`<img src="${imageFull}" alt="Voucher">`);
      } else {
        console.error('No se pudo abrir una nueva pestaña');
      }
    }
  } catch (error) {
    console.error('Error al generar la imagen del voucher:', error);
  } finally {
    document.body.removeChild(container);
  }
};
