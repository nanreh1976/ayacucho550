import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoAbonoComponent } from './pago-abono.component';

describe('PagoAbonoComponent', () => {
  let component: PagoAbonoComponent;
  let fixture: ComponentFixture<PagoAbonoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoAbonoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagoAbonoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
