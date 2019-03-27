import { TestBed } from '@angular/core/testing';

import { RentersFactoryService } from './renters-factory.service';

describe('RentersFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentersFactoryService = TestBed.get(RentersFactoryService);
    expect(service).toBeTruthy();
  });
});
