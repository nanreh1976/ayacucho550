import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayaViewComponent } from './playa-view.component';

describe('PlayaViewComponent', () => {
  let component: PlayaViewComponent;
  let fixture: ComponentFixture<PlayaViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayaViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayaViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
