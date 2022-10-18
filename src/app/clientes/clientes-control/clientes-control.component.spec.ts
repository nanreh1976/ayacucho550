import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesControlComponent } from './clientes-control.component';

describe('ClientesControlComponent', () => {
  let component: ClientesControlComponent;
  let fixture: ComponentFixture<ClientesControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
