import { IDataAccessObject } from "@dao/IDataAccessObject";
import { UserDao } from "@dao/models/Users/UserDao";
import { JWT } from "@server/utils/Jwt";
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
      const dbUser = await this.userDao.findOneByFilter(
        {email},
        {projection:{_id:1, email:1, password:1, state:1, roles:1, pswdExpires:1, avatar:1}}
      );
      if (Security.verifyPassword(password, dbUser.password)){
        delete dbUser.password;
        delete dbUser.pswdExpires;
        delete dbUser.state;
        // JWT
        const token = JWT.singJWT(dbUser);
        return token;
      }
      console.error("User.loginUser can´t validate password");
      throw new Error("Can´t Validate Credentials");
    }catch(err){
      console.error(err);
      throw new Error("Can´t Validate Credentials");
    }
  }
}
