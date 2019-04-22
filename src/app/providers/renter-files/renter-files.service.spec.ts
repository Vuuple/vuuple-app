import { TestBed } from '@angular/core/testing';

import { RenterFilesService } from './renter-files.service';

describe('RenterFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenterFilesService = TestBed.get(RenterFilesService);
    expect(service).toBeTruthy();
  });
});
