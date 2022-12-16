import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaLogComponent } from './caja-log.component';

describe('CajaLogComponent', () => {
  let component: CajaLogComponent;
  let fixture: ComponentFixture<CajaLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CajaLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
