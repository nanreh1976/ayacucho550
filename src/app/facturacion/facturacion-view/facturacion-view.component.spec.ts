import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturacionViewComponent } from './facturacion-view.component';

describe('FacturacionViewComponent', () => {
  let component: FacturacionViewComponent;
  let fixture: ComponentFixture<FacturacionViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacturacionViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacturacionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
