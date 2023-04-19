import { EmpresasDao } from "./EmpresasDao";
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEmpresa } from "./IEmpresas";

describe('EmpresasDao', () => {
  let EmpresaDaoInstance: EmpresasDao;
  beforeAll(async () => {
    await MongoDBConn.getConnection();
    EmpresaDaoInstance = new EmpresasDao(MongoDBConn);
    await EmpresaDaoInstance.init();
  });
  it('should be defined', () => {
    expect(EmpresaDaoInstance).toBeDefined();
  });
  it('should insert a new Empresa', async () => {
    const empresa: IEmpresa = {
      codigo: "TST001",
      nombre: "Prueba Empresa 1",
      status: "Active"
    };
    const result = await EmpresaDaoInstance.create(empresa);
    expect(result).toBeDefined();
  });


  afterAll(async () => {
    await MongoDBConn.connection.close();
  });
}
);
