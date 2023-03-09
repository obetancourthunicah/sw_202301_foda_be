import {MongoDAOBase} from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { DefaultUser, IUser } from './IUser';
export class UserDao extends MongoDAOBase<IUser> {
  constructor(conexion: IDBConnection){
      super("users", conexion);
  }
  public async create( user: Partial<IUser>){
    const newUser = {...DefaultUser, ...user};
    return super.create(newUser);
  }
}
