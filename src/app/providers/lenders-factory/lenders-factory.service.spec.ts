import { TestBed } from '@angular/core/testing';

import { LendersFactoryService } from './lenders-factory.service';

describe('LendersFactoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LendersFactoryService = TestBed.get(LendersFactoryService);
    expect(service).toBeTruthy();
  });
});
