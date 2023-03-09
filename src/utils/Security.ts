import * as bcrypt from 'bcryptjs';
export class Security {
  public static encodePassword( rawPassword : string){
    return bcrypt.hashSync(rawPassword, 10);
  }
  public static verifyPassword( rawPassword: string, encodePassword:string){
    return bcrypt.compareSync( rawPassword, encodePassword);
  }
}
