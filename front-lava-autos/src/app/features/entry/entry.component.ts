import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '@services/services.service';
import { IServicio } from 'app/shared/interfaces/servicio';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
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

  vehicleForm = new FormGroup({
    placa: new FormControl<string>('', Validators.required),
    marca: new FormControl<string>('', Validators.required),
    linea: new FormControl<string>('', Validators.required),
    tipo: new FormControl<string | null>(null, Validators.required),
    propietario: new FormControl<string>('', Validators.required),
    contacto: new FormControl<string>('', Validators.required),
  });

  serviceForm = new FormGroup({
    servicio: new FormControl<IServicio | null>(null, Validators.required),
  });

  constructor(
    private servicesService: ServicesService,
    private router: Router
  ) {
    this.servicesService.getAllServices().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (error) => {
        console.error('Error obteniendo servicios:', error);
      },
    });
  }

  saveVehicle() {}

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
        this.selectedServices = this.selectedServices.filter(s => s.id_servicio !== id_servicio);
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
}
