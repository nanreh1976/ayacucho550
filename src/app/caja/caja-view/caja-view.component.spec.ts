import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaViewComponent } from './caja-view.component';

describe('CajaViewComponent', () => {
  let component: CajaViewComponent;
  let fixture: ComponentFixture<CajaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
