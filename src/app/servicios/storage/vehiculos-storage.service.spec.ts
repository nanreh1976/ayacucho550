import { TestBed } from '@angular/core/testing';

import { VehiculosStorageService } from './vehiculos-storage.service';

describe('VehiculosStorageService', () => {
  let service: VehiculosStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VehiculosStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
