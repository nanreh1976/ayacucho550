import { TestBed } from '@angular/core/testing';

import { EstadiaService } from './estadia.service';

describe('EstadiaService', () => {
  let service: EstadiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
