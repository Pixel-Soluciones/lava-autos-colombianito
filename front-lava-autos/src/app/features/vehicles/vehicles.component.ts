import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicles',
  imports: [],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})
export class VehiclesComponent {
  
  constructor(private router: Router){}

  atras(){
    this.router.navigate(['dahsboard'])
  }

  nuevoIngreso(){
    this.router.navigate(['nuevo-ingreso'])

  }

  regSalida(){
    this.router.navigate(['salida'])

  }
}
