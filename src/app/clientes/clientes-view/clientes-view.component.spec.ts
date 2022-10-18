import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesViewComponent } from './clientes-view.component';

describe('ClientesViewComponent', () => {
  let component: ClientesViewComponent;
  let fixture: ComponentFixture<ClientesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
