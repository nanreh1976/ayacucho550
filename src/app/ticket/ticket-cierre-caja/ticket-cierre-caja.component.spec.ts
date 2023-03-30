import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCierreCajaComponent } from './ticket-cierre-caja.component';

describe('TicketCierreCajaComponent', () => {
  let component: TicketCierreCajaComponent;
  let fixture: ComponentFixture<TicketCierreCajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketCierreCajaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCierreCajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
