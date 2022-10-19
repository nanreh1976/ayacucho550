import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosControlComponent } from './vehiculos-control.component';

describe('VehiculosControlComponent', () => {
  let component: VehiculosControlComponent;
  let fixture: ComponentFixture<VehiculosControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
