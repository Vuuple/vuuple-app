import { VuupleLenderModule } from './vuuple-lender.module';

describe('VuupleLenderModule', () => {
  let vuupleLenderModule: VuupleLenderModule;

  beforeEach(() => {
    vuupleLenderModule = new VuupleLenderModule();
  });

  it('should create an instance', () => {
    expect(vuupleLenderModule).toBeTruthy();
  });
});
