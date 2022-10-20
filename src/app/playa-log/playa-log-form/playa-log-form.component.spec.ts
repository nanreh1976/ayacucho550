import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayaLogFormComponent } from './playa-log-form.component';

describe('PlayaLogFormComponent', () => {
  let component: PlayaLogFormComponent;
  let fixture: ComponentFixture<PlayaLogFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayaLogFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayaLogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
