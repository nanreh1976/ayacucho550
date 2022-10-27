import { TestBed } from '@angular/core/testing';

import { InterOpService } from './inter-op.service';

describe('InterOpService', () => {
  let service: InterOpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterOpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
