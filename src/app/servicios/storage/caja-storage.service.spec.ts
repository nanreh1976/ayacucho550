import { TestBed } from '@angular/core/testing';

import { CajaStorageService } from './caja-storage.service';

describe('CajaStorageService', () => {
  let service: CajaStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
