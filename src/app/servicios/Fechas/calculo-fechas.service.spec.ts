import { TestBed } from '@angular/core/testing';

import { CalculoFechasService } from './calculo-fechas.service';

describe('CalculoFechasService', () => {
  let service: CalculoFechasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculoFechasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
