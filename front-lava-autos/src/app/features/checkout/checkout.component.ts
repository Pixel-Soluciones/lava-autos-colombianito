import { EmployeesService } from './../../core/services/employees.service';
import { Vehicle } from './../../shared/models/vehicle';
import { ServicesService } from './../../core/services/services.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EntryService } from '@services/entry.service';
import { IEntry } from 'app/shared/interfaces/entry';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { Select, SelectChangeEvent, SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { IServicio } from 'app/shared/interfaces/servicio';
import { IEmployee } from 'app/shared/interfaces/employee';
import { RadioButton } from 'primeng/radiobutton';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FloatLabel,
    Select,
    TableModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    SelectModule,
    CommonModule,
    RadioButton,
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent {
  entrie?: IEntry | null;
  entriesOfDay: IEntry[] = [];
  tiposVehiculo: any[] = [];
  selectedServices: IServicio[] = [];
  services: IServicio[] = [];
  entries_filtered: IEntry[] = [];
  employees: IEmployee[] = [];
  flagUnknown = true;
  tipoPago!: any;

  vehicleForm = new FormGroup({
    placa: new FormControl<string | null>(null, Validators.required),
    marca: new FormControl<string>(
      { value: '', disabled: true },
      Validators.required
    ),
    linea: new FormControl<string>(
      { value: '', disabled: true },
      Validators.required
    ),
    tipo: new FormControl<string | null>(
      { value: null, disabled: true },
      Validators.required
    ),
    clave: new FormControl<string>(
      { value: '', disabled: true },
      Validators.required
    ),
    nombre_prop: new FormControl<string>(
      { value: '', disabled: true },
      Validators.required
    ),
    contacto: new FormControl<string>(
      { value: '', disabled: true },
      Validators.required
    ),
  });

  employeeForm = new FormGroup({
    employee: new FormControl<IEmployee | null>(null, Validators.required),
  });

  tipoPagoForm = new FormGroup({
    tipoPago: new FormControl<string>('', Validators.required),
  });

  constructor(
    private entryService: EntryService,
    private servicesService: ServicesService,
    private employeeService: EmployeesService,
    private router: Router
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
    this.entryService.getAll().subscribe((res) => {
      this.entriesOfDay = res;
    });

    this.servicesService.getAllServices().subscribe((res) => {
      this.services = res;
    });

    this.employeeService.getAll().subscribe((res) => {
      this.employees = res;
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.entrie = this.entryService.getEntrySelected();
    if (this.entrie !== null) {
      this.vehicleForm.patchValue(this.entrie.Vehicle);
      console.log(this.entrie);
      this.servicesService.getAllServices().subscribe({
        next: (res) => {
          this.services = res; // Guardamos los servicios cargados
          console.log('Servicios cargados:', this.services);

          // Ahora que los servicios están listos, hacemos el filtrado
          this.selectedServices = this.services.filter((service) =>
            this.entrie?.AsignedServices.some(
              (asigned: { id_servicio: number | undefined }) =>
                asigned.id_servicio === service.id_servicio
            )
          );
          console.log('Servicios seleccionados:', this.selectedServices);
        },
        error: (err) => {
          console.error('Error obteniendo servicios:', err);
        },
      });
    }
  }

  veryfyEmployees(): boolean {
    return (
      this.entrie?.AsignedServices.every(
        (service: { id_trabajador: number | null }) =>
          service.id_trabajador !== null
      ) ?? false
    );
  }

  saveCheckout() {
    if(!this.entrie){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Informacion incompleta',
        text: 'Ingrese una placa',
        showConfirmButton: false,
        timer: 1500,
      });      
    } else if(this.veryfyEmployees() === false) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Informacion incompleta',
        text: 'Asigne un trabajador a cada servicio',
        showConfirmButton: false,
        timer: 1500,
      });
    } else if(this.tipoPagoForm.invalid) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Informacion incompleta',
        text: 'Seleccione el tipo de pago',
        showConfirmButton: false,
        timer: 1500,
      });
    } else if(this.entrie && this.tipoPagoForm.valid) {
      this.entrie.tipo_pago = this.tipoPagoForm.get('tipoPago')?.value ?? '';
      //logica para enviar el registro a db, ya esta creado el servicio
    }
  }

  setEmployee(event: SelectChangeEvent, id_servicio: number) {
    console.log('Trabajador', event);
    console.log('id_servicio', id_servicio);
    this.entrie?.AsignedServices.forEach((servicio) => {
      if (servicio.id_servicio === id_servicio) {
        servicio.id_trabajador = event.value.cedula;
      }
    });
    console.log(this.entrie?.AsignedServices);
  }

  filterEntry(event: SelectChangeEvent) {
    console.log(event);
    if (event.value.placa) {
      this.vehicleForm.patchValue(event.value.Vehicle);
      this.entrie = event.value;
      this.selectedServices = this.services.filter((service) =>
        event.value.AsignedServices.some(
          (asigned: { id_servicio: number | undefined }) =>
            asigned.id_servicio === service.id_servicio
        )
      );

      return;
    }
    const textoBusqueda = event.value.trim();
    if (textoBusqueda && textoBusqueda.length > 1) {
      this.entries_filtered = this.entriesOfDay.filter((entrie) => {
        const placa = entrie.placa.replace(/[a-zA-Z]/g, (c) => c.toLowerCase());
        const busqueda = textoBusqueda.replace(/[a-zA-Z]/g, (c: string) =>
          c.toLowerCase()
        );
        return placa.startsWith(busqueda);
      });
    }
    if (textoBusqueda === '') {
      this.vehicleForm.reset();
      this.selectedServices.length = 0;
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
        this.entryService.setEntry(null);
        this.employeeForm.reset();
        this.vehicleForm.reset();
        this.tipoPagoForm.reset();
        this.selectedServices.length = 0;
        this.router.navigate(['vehicles']);
      }
    });
  }
}
