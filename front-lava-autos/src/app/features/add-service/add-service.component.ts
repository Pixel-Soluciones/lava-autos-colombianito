import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DatePicker } from 'primeng/datepicker';
import { CalendarModule } from 'primeng/calendar';
import { ButtonModule } from 'primeng/button';
import { Servicio } from 'models/servicio.model';


@Component({
  selector: 'app-add-service',
  imports: [ReactiveFormsModule, ButtonModule, FloatLabel, InputTextModule, CardModule, DatePicker, CalendarModule],
  templateUrl: './add-service.component.html',
  styleUrl: './add-service.component.scss'
})
export class AddServiceComponent {

  time: Date = new Date(0, 0, 0, 1,0, 0);
  servicios: Servicio[] = [];
  
  addServiceForm = new FormGroup({
      nombreServicio: new FormControl<string>('', Validators.required),
      descripcionServicio: new FormControl<string>('', Validators.required),
      valorServicio: new FormControl<number | null>(null,Validators.required),
      duracionServicio: new FormControl<Date | null>(null, Validators.required )
    });
    

    saveData(){
    }
}
