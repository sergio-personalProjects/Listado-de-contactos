import { TestBed } from '@angular/core/testing';

import { DecretoService } from './decreto-service';

describe('DecretoService', () => {
  let service: DecretoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecretoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
