import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaControlComponent } from './caja-control.component';

describe('CajaControlComponent', () => {
  let component: CajaControlComponent;
  let fixture: ComponentFixture<CajaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
