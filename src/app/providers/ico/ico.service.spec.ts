import { TestBed } from '@angular/core/testing';

import { IcoService } from './ico.service';

describe('IcoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IcoService = TestBed.get(IcoService);
    expect(service).toBeTruthy();
  });
});
