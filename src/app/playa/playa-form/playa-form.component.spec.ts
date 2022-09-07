import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayaFormComponent } from './playa-form.component';

describe('PlayaFormComponent', () => {
  let component: PlayaFormComponent;
  let fixture: ComponentFixture<PlayaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayaFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
