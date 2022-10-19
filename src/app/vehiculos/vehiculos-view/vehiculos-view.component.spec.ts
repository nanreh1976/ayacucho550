import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosViewComponent } from './vehiculos-view.component';

describe('VehiculosViewComponent', () => {
  let component: VehiculosViewComponent;
  let fixture: ComponentFixture<VehiculosViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculosViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
