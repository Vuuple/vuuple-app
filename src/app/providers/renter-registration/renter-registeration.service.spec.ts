import { TestBed } from '@angular/core/testing';

import { RenterRegisterationService } from './renter-registeration.service';

describe('RenterRegisterationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenterRegisterationService = TestBed.get(RenterRegisterationService);
    expect(service).toBeTruthy();
  });
});
