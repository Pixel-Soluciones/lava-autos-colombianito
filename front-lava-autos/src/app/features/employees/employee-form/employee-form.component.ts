import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '@services/employees.service';
import { IEmployee } from 'app/shared/interfaces/employee';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { switchMap } from 'rxjs';

@Component({
  selector: 'employee-form',
  imports: [ReactiveFormsModule, FloatLabel, InputTextModule, DatePicker, ButtonModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export default class EmployeeFormComponent {

  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private employeesService = inject(EmployeesService);

  editMode = false;
  loading = true;
  originalData: any;

  employeeForm: FormGroup = this.fb.group({
    cedula: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    contacto: ['', Validators.required],
    direccion: ['', Validators.required],
    fecha_nacimiento: ['', Validators.required],
    porcentaje_servicio: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
  });

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params && params['cedula']) {
        this.editMode = true;
        this.originalData = params;
        this.employeeForm.patchValue(params);
      } else {
        this.editMode = false;
      }
      this.loading = false;
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    } else {
      console.log('Form is invalid');
    }
  }

  private getFormValue() {
    return {
      ...this.employeeForm.value,
      cedula: this.originalData?.cedula || this.employeeForm.value.cedula
    }
  }

  // private handleSuccess() {
  //   this.router.navigate(['/employees']);
  // }

  edit() {
    console.log(this.getFormValue());
    
    this.getFormValue();
  }

  save() {}

  cancel() {
    this.router.navigate(['/employees']);
  }
}
