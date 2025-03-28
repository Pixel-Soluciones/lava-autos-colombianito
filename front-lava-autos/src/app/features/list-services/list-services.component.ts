import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from '@services/services.service';
import { IServicio } from 'app/shared/interfaces/servicio';
import { TableModule } from 'primeng/table';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-list-services',
  imports: [TableModule, CurrencyPipe],
  templateUrl: './list-services.component.html',
  styleUrl: './list-services.component.scss'
})
export class ListServicesComponent {
  
  servicios: IServicio[] = []

  constructor(
    private servicesService : ServicesService,
    private router : Router
  ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loadServices();
  }

  loadServices(){
      this.servicesService.getAllServices().subscribe({
        next: (data) => {
          this.servicios = data;
        },
        error: (error) => {
          console.error('Error obteniendo servicios:', error);
        },
      });
  }

  eliminarServicio(id_servicio: number){
    Swal.fire({
          title: "¿Esta seguro?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#32cd32",
          cancelButtonColor: "#d33",
          confirmButtonText: "Confirmar",
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              showConfirmButton:false,
              title: "Servicio eliminado",
              icon: "error",
              timer:1500
            });
            this.servicesService.deletService(id_servicio).subscribe((res) => {
              this.loadServices();
            });
          }
        });    
  }
  
  editarServicio(id_servicio: number): void {
    this.servicesService.setIdServicio(id_servicio);
    this.router.navigate(['add-service']);
  }

  atras(){
    this.router.navigate(['dashboard']);
  }

  nuevoServicio(){
    this.servicesService.setIdServicio(null);
    this.router.navigate(['add-service']);    
  }


}
