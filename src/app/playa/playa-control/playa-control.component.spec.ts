import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayaControlComponent } from './playa-control.component';

describe('PlayaControlComponent', () => {
  let component: PlayaControlComponent;
  let fixture: ComponentFixture<PlayaControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayaControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
