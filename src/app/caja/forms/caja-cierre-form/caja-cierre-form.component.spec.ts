import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaCierreFormComponent } from './caja-cierre-form.component';

describe('CajaCierreFormComponent', () => {
  let component: CajaCierreFormComponent;
  let fixture: ComponentFixture<CajaCierreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaCierreFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaCierreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
