import { TestBed } from '@angular/core/testing';

import { ConsultaFacturacionService } from './consulta-facturacion.service';

describe('ConsultaFacturacionService', () => {
  let service: ConsultaFacturacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsultaFacturacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
