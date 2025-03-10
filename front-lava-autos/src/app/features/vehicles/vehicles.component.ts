import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EntryService } from '@services/entry.service';
import { TableComponent } from 'app/shared/components/table/table.component';
import { Action } from 'app/shared/interfaces/action';
import { ActionButton } from 'app/shared/interfaces/actionButton';
import { IEntry } from 'app/shared/interfaces/entry';
import { getEntityPropiedades } from 'app/shared/models/columnsTables';

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
  ];
  constructor(private router: Router, private entryService: EntryService) {}

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
      this.delete(action.row.placa);
    } else if (action.action == 'View') {
      this.view(action.row);
    } else if (action.action == 'Checkout') {
      this.checkout(action.row);
    }
  }

  edit(data: IEntry) {
    console.log('edit', data);
    this.entryService.setEntry(data);
    this.router.navigate(['nuevo-ingreso']);
  }

  delete(data: any) {
    console.log('delete', data);
  }

  view(data: any) {
    console.log('view', data);
  }

  checkout(data: any) {
    console.log('checkout', data);
  }

  atras() {
    this.router.navigate(['dahsboard']);
  }

  nuevoIngreso() {
    this.router.navigate(['nuevo-ingreso']);
  }

  regSalida() {
    this.router.navigate(['salida']);
  }
}
