import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from 'app/shared/components/table/table.component';
import { IEntry } from 'app/shared/interfaces/entry';
import { getEntityPropiedades } from 'app/shared/models/columnsTables';

@Component({
  selector: 'app-vehicles',
  imports: [TableComponent],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.scss'
})

export class VehiclesComponent implements OnInit {

  entries: IEntry[] = []
    columns: string[] = []
  
  constructor(private router: Router){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.columns = getEntityPropiedades('entries')
  }

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
