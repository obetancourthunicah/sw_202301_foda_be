import { Security } from "./Security";
describe('test express_ts_sw_boilerplate', function () {
  it('should encodePassword', function (done) {
    expect(Security.encodePassword('test').length)
      .toBeGreaterThan(10);
    done();
  });
  it('should verifyPassword', function (done) {
    const encodePassword = Security.encodePassword('test');
    expect(Security.verifyPassword('test', encodePassword))
      .toBe(true);
    done();
  });
})
