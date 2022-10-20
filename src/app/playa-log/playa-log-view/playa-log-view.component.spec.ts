import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayaLogViewComponent } from './playa-log-view.component';

describe('PlayaLogViewComponent', () => {
  let component: PlayaLogViewComponent;
  let fixture: ComponentFixture<PlayaLogViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayaLogViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayaLogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
