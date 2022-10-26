import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasControlComponent } from './tarifas-control.component';

describe('TarifasControlComponent', () => {
  let component: TarifasControlComponent;
  let fixture: ComponentFixture<TarifasControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
