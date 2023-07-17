import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnConsultarComponent } from './btn-consultar.component';

describe('BtnConsultarComponent', () => {
  let component: BtnConsultarComponent;
  let fixture: ComponentFixture<BtnConsultarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnConsultarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnConsultarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
