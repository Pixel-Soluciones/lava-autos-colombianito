import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryService } from '@services/entry.service';
import { ServicesService } from '@services/services.service';
import { TableComponent } from 'app/shared/components/table/table.component';
import { Action } from 'app/shared/interfaces/action';
import { ActionButton } from 'app/shared/interfaces/actionButton';
import { IEntry } from 'app/shared/interfaces/entry';
import { IServicio } from 'app/shared/interfaces/servicio';
import { getEntityPropiedades } from 'app/shared/models/columnsTables';
import { generateTicket } from 'app/shared/utils/generateTicket';
import { catchError, map, Observable, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicles',
  imports: [TableComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss',
})
export class VehiclesComponent implements OnInit {
  entries: IEntry[] = [];
  columns: string[] = [];
  data: any[] = [];
  selectedServices: any[] = [];
  servicios: IServicio[] = [];
  actions: ActionButton[] = [
    {
      title: 'Ver Info',
      action: 'View',
      icon: 'iconos-botones/ver.png',
    },
    {
      title: 'Registrar Salida',
      action: 'Checkout',
      icon: 'iconos-botones/reg-salida.png',
    },
    {
      title: 'Imprimir',
      action: 'Print',
      icon: 'iconos-botones/imprimir.png',
    },
  ];

  constructor(
    private router: Router,
    private entryService: EntryService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.columns = getEntityPropiedades('entries');
    this.entryService.getAll().subscribe((res: IEntry[]) => {
      this.entries = res;
      console.log(this.entries);
    });
  }

  handleAction(action: Action) {
    if (action.action == 'Edit') {
      this.edit(action.row);
    } else if (action.action == 'Delete') {
      this.delete(action.row.id_ingreso);
    } else if (action.action == 'View') {
      this.view(action.row);
    } else if (action.action == 'Checkout') {
      this.checkout(action.row);
    } else if (action.action == 'Print') {
      this.print(action.row);
    }
  }

  print(data: IEntry) {
    this.filterAsignedServices(data.AsignedServices).subscribe(
      (selectedServices) => {
        const servicesTolist = selectedServices;
        console.log(servicesTolist);
        if (data.estado === 'EN PROCESO') {
          generateTicket(data, servicesTolist, 'INGRESO');
        } else if (data.estado === 'TERMINADO') {
          generateTicket(data, servicesTolist, 'SALIDA');
        } else {
          Swal.fire({
            showConfirmButton: false,
            title: 'No hay información',
            icon: 'error',
            timer: 1500,
          });
        }    
      }
    );
  }

  edit(data: IEntry) {
    console.log('edit', data);
    this.entryService.setEntry(data);
    this.router.navigate(['nuevo-ingreso']);
  }

  delete(data: any) {
    Swal.fire({
      title: '¿Esta seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#32cd32',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.entryService.cancelEntry(data).subscribe((res) => {
          Swal.fire({
            showConfirmButton: false,
            title: 'Registro cancelado',
            icon: 'success',
            timer: 1500,
          });
          this.ngOnInit();
        });
      }
    });
  }

  view(data: any) {
    this.filterAsignedServices(data.AsignedServices).subscribe(
      (selectedServices) => {
        this.selectedServices = selectedServices;
        console.log(this.selectedServices);
        const vehiculo = data.Vehicle;
        const valorPagar = selectedServices.reduce(
          (total, service) => total + (service.valor_servicio || 0),
          0
        );

        // Construimos la información del vehículo
        const vehiculoInfo = `
          <p>Placa: ${vehiculo.placa}</p>
          <p>Marca: ${vehiculo.marca}</p>
          <p>Línea: ${vehiculo.linea}</p>
          <p>Propietario: ${vehiculo.nombre_prop}</p>
          <p>Contacto: ${vehiculo.contacto}</p>
          <p>Clave: ${vehiculo.clave}</p>
        `;

        // Convertimos los servicios en una lista HTML
        const serviceList = selectedServices
          .map(
            (service) =>
              `<li>${
                service.nombre_servicio
              } - $${service.valor_servicio.toLocaleString()}</li>`
          )
          .join('');

        const ticketContent = `
          🚗 Información del Vehículo
          ${vehiculoInfo.replace(/<[^>]*>/g, '')}
          
          🛠️ Servicios Asignados
          ${serviceList.replace(/<[^>]*>/g, '')}
          
          💰 Total a pagar: $${valorPagar.toLocaleString()}
        `;

        Swal.fire({
          title: 'Información del ingreso',
          html: `
        <div style="text-align:center;">
          <h1><strong>🚗 Información del Vehículo</strong></h1>
          ${vehiculoInfo}
          <h1 class = "mt-4"><strong>🛠️ Servicios Asignados</strong></h1>
          <ul>
            ${serviceList}
          </ul>
          <h1 class = "mt-4"><strong>💰 Total a pagar</strong></h1>
          <p style="font-size: 18px; font-weight: bold; color: green;">$${valorPagar.toLocaleString()}</p>
        </div>
      `,
          // icon: 'success',
          // confirmButtonText: 'Cerrar',
          icon: 'success',
          showDenyButton: true,
          showCancelButton: true,
          denyButtonText: 'WhatsApp',
          cancelButtonText: 'Cerrar',
          denyButtonColor: '#25D366',
        }).then((result) => {
          if (result.isDenied) {
            // share via whatsapp
            const whatsappUrl = `https://wa.me/${
              vehiculo.contacto
            }?text=${encodeURIComponent(ticketContent)}`;
            window.open(whatsappUrl, '_blank');
          }
        });
      }
    );
  }

  checkout(data: any) {
    this.entryService.setEntry(data);
    this.router.navigate(['registrar-salida']);
  }

  atras() {
    this.router.navigate(['dahsboard']);
  }

  nuevoIngreso() {
    this.entryService.setEntry(null);
    this.router.navigate(['nuevo-ingreso']);
  }

  regSalida() {
    this.router.navigate(['registrar-salida']);
  }

  filterAsignedServices(data: any): Observable<IServicio[]> {
    return this.servicesService.getAllServices().pipe(
      map((res: IServicio[]) => {
        const selectedServices: IServicio[] = res.filter((service) =>
          data.some(
            (asigned: { id_servicio: number | undefined }) =>
              asigned.id_servicio === service.id_servicio
          )
        );
        return selectedServices;
      }),
      catchError((error) => {
        console.error('Error obteniendo servicios:', error);
        return of([]);
      })
    );
  }
}
