import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnEgresoComponent } from './btn-egreso.component';

describe('BtnEgresoComponent', () => {
  let component: BtnEgresoComponent;
  let fixture: ComponentFixture<BtnEgresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnEgresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnEgresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
