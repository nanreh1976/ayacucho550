import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaAperturaFormComponent } from './caja-apertura-form.component';

describe('CajaAperturaFormComponent', () => {
  let component: CajaAperturaFormComponent;
  let fixture: ComponentFixture<CajaAperturaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaAperturaFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaAperturaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
