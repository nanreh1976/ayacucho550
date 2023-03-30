import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketEntradaComponent } from './ticket-entrada.component';

describe('TicketEntradaComponent', () => {
  let component: TicketEntradaComponent;
  let fixture: ComponentFixture<TicketEntradaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketEntradaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketEntradaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
