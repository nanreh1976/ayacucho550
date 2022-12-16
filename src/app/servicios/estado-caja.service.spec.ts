import { TestBed } from '@angular/core/testing';

import { EstadoCajaService } from './estado-caja.service';

describe('EstadoCajaService', () => {
  let service: EstadoCajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
