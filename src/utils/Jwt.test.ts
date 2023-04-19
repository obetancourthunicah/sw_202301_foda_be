import {JWT} from './Jwt';
describe('Jwt Test', ()=> {
  it('should return a token', () => {
    const token = JWT.singJWT({id: 1});
    expect(token).toBeTruthy();
  });
  it('should return a payload', () => {
    const token = JWT.singJWT({id: 1});
    const payload = JWT.verifyJWT(token);
    expect(payload).toBeTruthy();
  });
});
