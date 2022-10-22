import { TestBed } from '@angular/core/testing';

import { ValidarPatenteService } from './validar-patente.service';

describe('ValidarPatenteService', () => {
  let service: ValidarPatenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidarPatenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
