import { TestBed } from '@angular/core/testing';

import { LendersRegistrationService } from './lenders-registration.service';

describe('LendersRegistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LendersRegistrationService = TestBed.get(LendersRegistrationService);
    expect(service).toBeTruthy();
  });
});
