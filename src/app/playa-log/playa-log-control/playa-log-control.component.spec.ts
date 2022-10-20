import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayaLogControlComponent } from './playa-log-control.component';

describe('PlayaLogControlComponent', () => {
  let component: PlayaLogControlComponent;
  let fixture: ComponentFixture<PlayaLogControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayaLogControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayaLogControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
