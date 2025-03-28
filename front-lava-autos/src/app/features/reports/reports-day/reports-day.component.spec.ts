import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDayComponent } from './reports-day.component';

describe('ReportsDayComponent', () => {
  let component: ReportsDayComponent;
  let fixture: ComponentFixture<ReportsDayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportsDayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportsDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
