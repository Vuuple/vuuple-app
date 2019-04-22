import { TestBed } from '@angular/core/testing';

import { RenterEscrowService } from './renter-escrow.service';

describe('RenterEscrowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenterEscrowService = TestBed.get(RenterEscrowService);
    expect(service).toBeTruthy();
  });
});
