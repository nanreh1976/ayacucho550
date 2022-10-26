import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifasViewComponent } from './tarifas-view.component';

describe('TarifasViewComponent', () => {
  let component: TarifasViewComponent;
  let fixture: ComponentFixture<TarifasViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarifasViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarifasViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
