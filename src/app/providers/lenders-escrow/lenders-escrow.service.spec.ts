import { TestBed } from '@angular/core/testing';

import { LendersEscrowService } from './lenders-escrow.service';

describe('LendersEscrowService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LendersEscrowService = TestBed.get(LendersEscrowService);
    expect(service).toBeTruthy();
  });
});
