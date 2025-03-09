import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeesService } from '@services/employees.service';
import { IEmployee } from 'app/shared/interfaces/employee';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import Swal from 'sweetalert2';

@Component({
  selector: 'employee-form',
  imports: [ReactiveFormsModule, FloatLabel, InputTextModule, DatePicker, ButtonModule, InputNumberModule ],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export default class EmployeeFormComponent implements OnInit {

  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #employeesService = inject(EmployeesService);

  editMode = false;
  loading = true;
  originalData: any;

  employeeForm: FormGroup = this.#fb.group({
    cedula: ['null', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    contacto: ['null', Validators.required],
    direccion: ['', Validators.required],
    fecha_nacimiento: ['', Validators.required],
    porcentaje_servicio: ['null', [Validators.required]]
  });

  ngOnInit(): void {
    this.#route.params.subscribe((params) => {
      if(params && params['cedula']) {
        this.editMode = true;
        this.originalData = params;
        const formData = { ...params };
        if (formData['fecha_nacimiento']) {
          formData['fecha_nacimiento'] = new Date(formData['fecha_nacimiento']);
        }
        this.employeeForm.patchValue(formData);
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

  edit() {
    if (!this.employeeForm.valid) {
      Swal.fire({
        title: 'Formulario invalido',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.#employeesService.update(this.getFormValue()).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Empleado actualizado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.#router.navigate(['/employees']);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error al actualizar empleado',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  save() {
    if (!this.employeeForm.valid) {
      Swal.fire({
        title: 'Formulario invalido',
        icon: 'error',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.#employeesService.save(this.getFormValue()).subscribe({
      next: (data) => {
        Swal.fire({
          title: 'Empleado guardado',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        });
        this.#router.navigate(['/employees']);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error al guardar empleado',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500
        });
      }
    });
  }

  cancel() {
    this.#router.navigate(['/employees']);
  }
}
