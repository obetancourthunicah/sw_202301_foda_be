import { UserDao } from "./UserDao";
import { MongoDBConn } from '@dao/MongoDBConn';
import { IUser, EUserState } from "./IUser";

describe('UserDao', () => {
  let UserDaoInstance: UserDao;
  beforeAll(async () => {
    await MongoDBConn.getConnection();
    UserDaoInstance = new UserDao(MongoDBConn);
    await UserDaoInstance.init();
  });
  it('should be defined', () => {
    expect(UserDaoInstance).toBeDefined();
  });
  it('should insert a new User', async () => {
    const user: IUser = {
      email: "test@test.com",
      password: "someRandomTestPassword",
      state: EUserState.ACT,
      roles: ['public'],
      pswdExpires: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await UserDaoInstance.create(user);
    expect(result).toBeDefined();
  });


  afterAll(async () => {
    await MongoDBConn.connection.close();
  });
}
);
