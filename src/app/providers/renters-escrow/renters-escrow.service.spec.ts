import { TestBed } from '@angular/core/testing';

import { RentersEscrowService } from './renters-escrow.service';

describe('RentersEscrowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentersEscrowService = TestBed.get(RentersEscrowService);
    expect(service).toBeTruthy();
  });
});
