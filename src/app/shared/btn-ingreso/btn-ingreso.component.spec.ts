import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnIngresoComponent } from './btn-ingreso.component';

describe('BtnIngresoComponent', () => {
  let component: BtnIngresoComponent;
  let fixture: ComponentFixture<BtnIngresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnIngresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnIngresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
