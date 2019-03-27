import { TestBed } from '@angular/core/testing';

import { RentersRegistrationService } from './renters-registration.service';

describe('RentersRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentersRegistrationService = TestBed.get(RentersRegistrationService);
    expect(service).toBeTruthy();
  });
});
