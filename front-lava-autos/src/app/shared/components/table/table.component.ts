import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Action } from 'app/shared/interfaces/action';
import { TableModule } from 'primeng/table';
import { ActionButton } from 'app/shared/interfaces/actionButton';

@Component({
  selector: 'app-table',
  imports: [CommonModule, TableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() title: string = '';
  @Input() cols: any[] = [];
  @Input() dataSource: any[] = [];
  @Input() actions: ActionButton[] = [];

  @Output() action: EventEmitter<Action> = new EventEmitter();

  onAction(action: string, row: any) {
    this.action.emit({ action, row });
  }
}
