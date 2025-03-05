import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '@services/services.service';
import { VehiclesService } from '@services/vehicles.service';
import { IServicio } from 'app/shared/interfaces/servicio';
import { IVehicle } from 'app/shared/interfaces/vehicle';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-entry',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FloatLabel,
    InputTextModule,
    CardModule,
    SelectModule,
    TableModule,
    CommonModule,
    FormsModule,
    Select,
  ],
  templateUrl: './entry.component.html',
  styleUrl: './entry.component.scss',
})
export class EntryComponent {
  flagEdit: boolean = false;
  tiposVehiculo: any[] = [];
  servicios: IServicio[] = [];
  selectedService: any;
  selectedServices: IServicio[] = [];
  totalToPay: number = 0;
  vehicles: IVehicle[] = [];
  vehicles_filtered: IVehicle[] = [];
  tipo_selected: any;

  vehicleForm = new FormGroup({
    placa: new FormControl<string | null>(null, Validators.required),
    marca: new FormControl<string>('', Validators.required),
    linea: new FormControl<string>('', Validators.required),
    tipo: new FormControl<string | null>(null, Validators.required),
    clave: new FormControl<string>('', Validators.required),
    nombre_prop: new FormControl<string>('', Validators.required),
    contacto: new FormControl<string>('', Validators.required),
  });

  serviceForm = new FormGroup({
    servicio: new FormControl<IServicio | null>(null, Validators.required),
  });

  constructor(
    private servicesService: ServicesService,
    private router: Router,
    private vehiclesService: VehiclesService
  ) {
    this.tiposVehiculo = [
      { tipo: 'Moto' },
      { tipo: 'Automóvil' },
      { tipo: 'Camioneta' },
      { tipo: 'Camión' },
      { tipo: 'Furgoneta' },
      { tipo: 'Pickup' },
      { tipo: 'Bus' },
      { tipo: 'Buseta' },
      { tipo: 'Ambulancia' },
    ];

    this.servicesService.getAllServices().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (error) => {
        console.error('Error obteniendo servicios:', error);
      },
    });

    this.vehiclesService.getAll().subscribe((res) => {
      this.vehicles = res;
      console.log(this.vehicles);
    });
  }

  filterVehicle(event: SelectChangeEvent) {
    if (event.value.placa) {
      this.vehicleForm.patchValue(event.value);
      this.tipo_selected = event.value.tipo;
      console.log(this.tipo_selected);
      return;
    }
    const textoBusqueda = event.value.trim();
    

    if (textoBusqueda && textoBusqueda.length > 1) {
      this.vehicles_filtered = this.vehicles.filter((vehicle) => {
        const placa = vehicle.placa.replace(/[a-zA-Z]/g, (c) =>
          c.toLowerCase()
        );
        const busqueda = textoBusqueda.replace(/[a-zA-Z]/g, (c: string) =>
          c.toLowerCase()
        );
        return placa.startsWith(busqueda);
      });
    } if (textoBusqueda === ''){
      this.vehicleForm.reset();
    }
  }

  saveVehicle() {
    console.log(this.vehicleForm.value);    
  }

  addService() {
    const selectedService = this.serviceForm.get('servicio')?.value;

    // Verificar que el servicio no sea nulo y que no esté repetido
    if (
      selectedService &&
      !this.selectedServices.some(
        (s) => s.id_servicio === selectedService.id_servicio
      )
    ) {
      this.selectedServices.push(selectedService);
      this.serviceForm.reset();
    } else {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Ya esta agregado',
        text: 'Debe registrar un servicio distinto',
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  eliminarServicio(id_servicio: number) {
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
        this.selectedServices = this.selectedServices.filter(
          (s) => s.id_servicio !== id_servicio
        );
        Swal.fire({
          showConfirmButton: false,
          title: 'Servicio eliminado',
          icon: 'error',
          timer: 1500,
        });
      }
    });
  }

  getTotalServicios(): number {
    return this.selectedServices.reduce(
      (total, servicio) => total + (servicio.valor_servicio || 0),
      0
    );
  }

  cancelar() {
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
        Swal.fire({
          showConfirmButton: false,
          title: 'Registro cancelado',
          icon: 'error',
          timer: 1500,
        });
        this.serviceForm.reset();
        this.vehicleForm.reset();
        this.selectedServices.length = 0;
        this.router.navigate(['vehicles']);
      }
    });
  }
}
