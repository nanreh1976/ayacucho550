import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasFormComponent } from './tarifas-form.component';

describe('TarifasFormComponent', () => {
  let component: TarifasFormComponent;
  let fixture: ComponentFixture<TarifasFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
