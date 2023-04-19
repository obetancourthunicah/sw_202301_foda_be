import { FodaDao } from "./FodaDao";
import { EmpresasDao } from "../Empresas/EmpresasDao";
import { MongoDBConn } from '@dao/MongoDBConn';
import { IFoda, IFodaEstados } from "./IFoda";
import { UserDao } from "../Users/UserDao";
import { DefaultUser, IUser } from "../Users/IUser";
import { EFodaType } from "./IFodaEntry";

describe('FodaDao', () => {
  let FodaInstance: FodaDao;
  let EmpresaDaoInstance: EmpresasDao;
  let UserDaoInstance: UserDao;
  let empresaId;
  let user: IUser;
  let fodaId;
  beforeAll(async () => {
    await MongoDBConn.getConnection();
    UserDaoInstance = new UserDao(MongoDBConn);
    await UserDaoInstance.init();
    EmpresaDaoInstance = new EmpresasDao(MongoDBConn);
    await EmpresaDaoInstance.init();
    FodaInstance = new FodaDao(MongoDBConn, EmpresaDaoInstance);
    await FodaInstance.init();
    const { insertedId } = await EmpresaDaoInstance.create({
      "codigo": "ABC_1",
      "nombre": "Corporación ABC",
      "status": "Pending"
    });
    empresaId = insertedId;
    const {insertedId: userId} = await UserDaoInstance.create({
      ...DefaultUser,
      email: "test@test.com",
      password: "test"
    });
    user = await UserDaoInstance.findByID(userId.toString());
  });
  it('should be defined', () => {
    expect(FodaInstance).toBeDefined();
  });
  it('should create a new Foda', async () => {
   const foda: Partial<IFoda> = {
      empresa: {
        id: empresaId,
      },
      nombre: "New Foda Test",
      owner: {
        id: user._id,
        usuario: '',
        email: user.email,
      },
      estado: IFodaEstados.Planning,
    };
    const { insertedId } = await FodaInstance.create(foda);
    fodaId = insertedId;
    expect(insertedId).toBeDefined();
  });

  it('should throw error when creating a new Foda with wrong empresa id', async () => {
    const foda: Partial<IFoda> = {
       empresa: {
         id: '5d6f7f62c9b7c8d',
       },
       nombre: "New Foda Test",
       owner: {
         id: user._id,
         usuario: '',
         email: user.email,
       },
       estado: IFodaEstados.Planning,
     };
    await expect(FodaInstance.create(foda)).rejects.toThrowError();
  });

  it('should update Fodas Counter', async () => {
    const { modifiedCount } = await FodaInstance.updateCounter(fodaId, EFodaType.Fortaleza);
    expect(modifiedCount).toBe(1);
  });
  afterAll(async () => {
    await MongoDBConn.connection.close();
  });
}
);
