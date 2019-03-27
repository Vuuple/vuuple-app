import { VuuplAdminModule } from './vuupl-admin.module';

describe('VuuplAdminModule', () => {
  let vuuplAdminModule: VuuplAdminModule;

  beforeEach(() => {
    vuuplAdminModule = new VuuplAdminModule();
  });

  it('should create an instance', () => {
    expect(vuuplAdminModule).toBeTruthy();
  });
});
