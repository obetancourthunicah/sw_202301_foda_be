import { IDataAccessObject } from "@dao/IDataAccessObject";
import { UserDao } from "@dao/models/Users/UserDao";
import { Security } from "@utils/Security";

export class Users {
  private userDao: UserDao;
  constructor(user: IDataAccessObject) {
    this.userDao = user as UserDao;
  }
  public async newUser(email: string, password: string) {
    try {
      const newUser = {
        email,
        password: Security.encodePassword(password),
        pswdExpires: new Date(new Date().getTime()+(3 * 30 * 24 * 60 * 60 * 1000))
      };
      const result = await this.userDao.create(newUser);
      const rt = await this.userDao.findOneByFilter({ _id: result?.insertedId });
      delete rt.password;
      return rt;
    } catch (ex) {
      console.error('newFoda error:', ex);
      return null;
    }
  }
  public async loginUser(email:string, password:string) {
    try{
      const dbUser = await this.userDao.findOneByFilter({email});
      if (Security.verifyPassword(password, dbUser.password)){
        delete dbUser.password;
        // JWT
      }
    }catch(err){
      console.error(err);
      throw new Error("Can´t Validate Credentials");
    }
  }
}
