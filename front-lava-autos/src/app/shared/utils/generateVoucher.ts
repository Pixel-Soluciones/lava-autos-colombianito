import { IEntry } from '../interfaces/entry';
import { IServicio } from '../interfaces/servicio';
import html2canvas from 'html2canvas';

export const generateVoucher = async (
  data: IEntry,
  services: IServicio[],
  type: string
) => {
  // 1. Construir HTML
  const container = document.createElement('div');
  container.id = 'voucher';
  container.style.width = '58mm';
  container.style.fontFamily = 'monospace';
  container.style.fontSize = '14px';
  container.style.padding = '5px';

  // 2. Lista de servicios en HTML
  const serviciosHTML = services
    .map(
      (s: IServicio) =>
        `<div style="display: flex; justify-content: space-between;"><span>${
          s.nombre_servicio
        }</span><span>$${s.valor_servicio.toLocaleString()}</span></div>`
    )
    .join('');

  const total = services.reduce((sum, s) => sum + s.valor_servicio, 0);

  const flag = type;
  const tipoPago =
    flag === 'SALIDA'
      ? `MÉTODO DE PAGO: ${data.tipo_pago.toUpperCase()}`
      : flag === 'INGRESO'
      ? ''
      : '';
  container.innerHTML = `
    <div class="ticket">
      <div style="text-align:center">
        <img src="iconos-botones/icono-voucher.png" alt="Logo" style="width:130px; margin:10px auto; display:block; padding-top: 15px;" />
        <strong>Lavadero Colombianito</strong><br/>
        NIT: 900000000-1<br/>
        Calle 123 #45-67<br/>
        Tel: 300 123 4567
      </div>

      <hr />

      <div style="text-align:center; font-size: 24px; padding: 5px;" ><strong>${
        data.placa
      }</strong><br/></div

      <div>
        Fecha: ${new Date().toLocaleDateString('es-ES')}<br/>
        Propietario: ${data.Vehicle.nombre_prop}<br/>
        Contacto: ${data.Vehicle.contacto}
      </div>

      <div style="margin:10px 0; border-top:1px dashed #000; border-bottom:1px dashed #000;">
        ${serviciosHTML}
      </div>

      <div style="text-align:right; font-weight:bold">TOTAL: $${total.toLocaleString()}</div>
      <div style="text-align:right; font-weight:bold">${tipoPago}</div>


      <div style="text-align:center; margin-top:15px">
        *****************************<br/>
        Este documento no es factura legal.<br/>.<br/>
        .
        </div>
    </div>
  `;

  // 3. Agregar al DOM de forma temporal
  document.body.appendChild(container);

  // 4. Capturar y convertir a imagen
  const canvas = await html2canvas(container);
  const base64 = canvas.toDataURL('image/png');

  // 5. Quitar del DOM
  document.body.removeChild(container);

  // 6. Imprimir con RawBT

  //   const html = `<html><body>${container?.outerHTML}</body></html>`;
  //   const win = window.open('', '_blank');
  //   if (win && html) {
  //     win.document.write(html);
  //     win.document.close();
  //   }
  window.open('rawbt:base64=' + base64.split(',')[1]);
};
