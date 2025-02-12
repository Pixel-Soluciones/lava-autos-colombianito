import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-footer',
  imports: [],
  templateUrl: './nav-footer.component.html',
  styleUrl: './nav-footer.component.scss'
})
export class NavFooterComponent {

  private router = inject(Router);

  @Input() icon: string = '';
  @Output() create: EventEmitter<any> = new EventEmitter();

  return(){
    this.router.navigate(['dashboard']);
  }

  newElement(){
    this.create.emit('new');
  }
}
