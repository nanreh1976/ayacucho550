import { TestBed } from '@angular/core/testing';

import { CajaStoreService } from './caja-store.service';

describe('CajaStoreService', () => {
  let service: CajaStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
