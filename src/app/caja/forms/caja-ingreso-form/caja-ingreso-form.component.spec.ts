import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaIngresoFormComponent } from './caja-ingreso-form.component';

describe('CajaIngresoFormComponent', () => {
  let component: CajaIngresoFormComponent;
  let fixture: ComponentFixture<CajaIngresoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaIngresoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaIngresoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
