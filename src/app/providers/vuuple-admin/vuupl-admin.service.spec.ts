import { TestBed } from '@angular/core/testing';

import { VuuplAdminService } from './vuupl-admin.service';

describe('VuuplAdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VuuplAdminService = TestBed.get(VuuplAdminService);
    expect(service).toBeTruthy();
  });
});
