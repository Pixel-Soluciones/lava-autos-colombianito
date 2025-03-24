import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { FloatLabel } from 'primeng/floatlabel';
import { TableReportComponent } from "../../../shared/components/table-report/table-report.component";
import { getEntityPropiedades } from 'app/shared/models/columnsTables';
import { MonthlyReportService } from './services/monthly-report.service';
import { generateExcelReport } from 'app/shared/utils/generateExcelReport';
import Swal from 'sweetalert2';

export interface monthSelected {
  month: number;
  year: number;
}

interface Service {
  id: number;
  servicio: string;
  valor: number;
  valor_porcentaje: number;
}


@Component({
  selector: 'app-reports-month',
  imports: [FloatLabel, DatePicker, FormsModule, ButtonModule, TableReportComponent, CommonModule],
  templateUrl: './reports-month.component.html',
  styleUrl: './reports-month.component.scss'
})
export default class ReportsMonthComponent {
  
  #router= inject(Router);
  #monthlyReportService = inject(MonthlyReportService);

  isLoading = signal(false);

  date = signal<Date | null>(null);
  cols = signal<{key: string, value: string}[]>(getEntityPropiedades('monthlyReport'));
  services = signal<Service[]>([]);

  total = computed(() => this.services().reduce((acc, service) => acc + service.valor, 0));
  total_trabajadores = computed(() => this.services().reduce((acc, service) => acc + service.valor_porcentaje, 0));
  total_ganancias = computed(() => this.total() - this.total_trabajadores());
  servicioMasSolicitado = computed(() => {
    const frequencyMap = new Map<string, number>();
    this.services().forEach(service => {
      frequencyMap.set(service.servicio, (frequencyMap.get(service.servicio) || 0) + 1);
    });
    return Array.from(frequencyMap.entries()).reduce((acc, [value, count]) => 
      count > acc.count ? { value, count } : acc, 
      { value: '', count: 0 }
    ).value;
  });

  selectedMonth(date: Date) {
    if (!date) return;
    this.isLoading.set(true);
    this.date.set(date);
    const formattedDate = this.formatDate(date);
    this.#monthlyReportService.get(formattedDate).subscribe({
      next: (response: Service[]) => {
        this.services.set(response);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo obtener el reporte',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }
    }
    );
  }

  private formatDate(date: Date): monthSelected {
    return { month: date.getMonth() + 1, year: date.getFullYear() };
  }

  exportReport() {
    if (this.services().length === 0) return;

    const worksheet: any[] = [this.cols().map(col => col.key)];

    this.services().forEach(service => {
      worksheet.push(this.cols().map(col => service[col.key as keyof Service]));
    });

    generateExcelReport(worksheet);
  }

  salir() {
    this.#router.navigate(['reports']);
  }

  handleAction(event: any) {}
}
