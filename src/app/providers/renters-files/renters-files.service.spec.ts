import { TestBed } from '@angular/core/testing';

import { RentersFilesService } from './renters-files.service';

describe('RentersFilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RentersFilesService = TestBed.get(RentersFilesService);
    expect(service).toBeTruthy();
  });
});
