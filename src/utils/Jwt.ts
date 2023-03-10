import * as jwt from 'jsonwebtoken';
export class JWT {
  private static secret = process.env.JWT_SECRET;
  public static singJWT(payload: object) {
    return jwt.sign(payload, this.secret, {expiresIn:"24h"});
  }
  public static verifyJWT(token: string) {
    return jwt.verify(token, this.secret);
  }
}
