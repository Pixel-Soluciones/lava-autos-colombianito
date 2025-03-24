import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action } from 'app/shared/interfaces/action';
import { ActionButton } from 'app/shared/interfaces/actionButton';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'table-report',
  imports: [CommonModule, TableModule],
  templateUrl: './table-report.component.html',
  styleUrl: './table-report.component.scss'
})
export class TableReportComponent {

  @Input() title: string = '';
  @Input() cols: any[] = [];
  @Input() dataSource: any[] = [];
  @Input() actions: ActionButton[] = [];

  @Output() action: EventEmitter<Action> = new EventEmitter();

  onAction(action: string, row: any) {
    this.action.emit({ action, row });
  }
  
}
