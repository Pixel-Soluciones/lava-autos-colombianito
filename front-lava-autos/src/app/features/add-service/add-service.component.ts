import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { Servicio } from 'models/servicio.model';
import { ServicesService } from 'app/services/services.service';
import { MessageService } from 'primeng/api';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    FloatLabel,
    InputTextModule,
    CardModule,
    DatePicker,
    CalendarModule,
  ],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss',
  providers: [MessageService]
})
export class AddServiceComponent {
  constructor(
    private servicesService: ServicesService,
    private changeDetectorRef: ChangeDetectorRef,
    private messageService: MessageService,
    private router: Router
  ) {}

  time: Date = new Date(0, 0, 0, 1, 0, 0);
  servicios: Servicio[] = [];

  addServiceForm = new FormGroup({
    nombreServicio: new FormControl<string>('', Validators.required),
    descripcionServicio: new FormControl<string>('', Validators.required),
    valorServicio: new FormControl<number | null>(null, Validators.required),
    duracionServicio: new FormControl<string | null>(null, Validators.required),
  });

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadServices();
  }

  cleanForm(){
    this.addServiceForm.reset({
      nombreServicio : '',
      descripcionServicio: '',
      valorServicio : null,
      duracionServicio:'01:00'
    });
  }
  cancelar(){
    Swal.fire({
      title: "¿Esta seguro?",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, estoy seguro",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          showConfirmButton:false,
          title: "Registro cancelado",
          icon: "error",
          timer:1500
        });
        this.cleanForm();
        this.router.navigate(['list-services']);
      }
    });

  }

  loadServices() {
    this.servicesService.getAllServices().subscribe({
      next: (data) => {
        this.servicios = data;
      },
      error: (error) => {
        console.error('Error obteniendo servicios:', error);
      },
    });
  }

  saveData() {
    const servicioExiste = this.servicios.some(
      (servicio) =>
        servicio.nombre_servicio ===
        this.addServiceForm.get('nombreServicio')?.value
    );
    if (servicioExiste) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Ya esta agregado",
        text: "Debe registrar un servicio distinto",
        showConfirmButton: false,
        timer: 1500
      });
    } else if (this.addServiceForm.invalid) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Información incompleta",
        text: "Debe registrar la información en todos los campos",
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      const duracionServicio = new Date(this.addServiceForm.get('duracionServicio')?.value!) 
      const tiempoFormateado = duracionServicio? duracionServicio.toTimeString().split(" ")[0]: '';
      console.log(tiempoFormateado);

      const servicio: Servicio = {
        nombre_servicio: this.addServiceForm.get('nombreServicio')?.value!,
        descrip_servicio: this.addServiceForm.get('descripcionServicio')
          ?.value!,
        valor_servicio: this.addServiceForm.get('valorServicio')?.value!,
        tiempo_estimado: tiempoFormateado,
      };
      this.servicesService.saveService(servicio).subscribe(
        (response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Servicio agregado",
            showConfirmButton: false,
            timer: 1500
          });
          this.loadServices();
          this.cleanForm();
        },
        (error) => {
          console.log('no se guardo');
        }
      );
    }
  }
}
