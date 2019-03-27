import { VuupleRenterModule } from './vuuple-renter.module';

describe('VuupleRenterModule', () => {
  let vuupleRenterModule: VuupleRenterModule;

  beforeEach(() => {
    vuupleRenterModule = new VuupleRenterModule();
  });

  it('should create an instance', () => {
    expect(vuupleRenterModule).toBeTruthy();
  });
});
