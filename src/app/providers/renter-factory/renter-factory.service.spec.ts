import { TestBed } from '@angular/core/testing';

import { RenterFactoryService } from './renter-factory.service';

describe('RenterFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenterFactoryService = TestBed.get(RenterFactoryService);
    expect(service).toBeTruthy();
  });
});
