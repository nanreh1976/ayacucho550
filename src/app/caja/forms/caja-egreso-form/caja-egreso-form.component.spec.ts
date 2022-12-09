import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaEgresoFormComponent } from './caja-egreso-form.component';

describe('CajaEgresoFormComponent', () => {
  let component: CajaEgresoFormComponent;
  let fixture: ComponentFixture<CajaEgresoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaEgresoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaEgresoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
