import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnShowComponent } from './btn-show.component';

describe('BtnShowComponent', () => {
  let component: BtnShowComponent;
  let fixture: ComponentFixture<BtnShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnShowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
