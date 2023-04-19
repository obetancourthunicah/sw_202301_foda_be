import { EmpresasDao } from "@dao/models/Empresas/EmpresasDao";
import { MongoDBConn } from '@dao/MongoDBConn';
import { IEmpresa } from "@dao/models/Empresas/IEmpresas";
import { Empresas } from "./Empresas";
describe('Empresas Lib', () => {
  let EmpresasDaoInstance: EmpresasDao;
  let EmpresasInstance: Empresas;
  let EmpresasLength: number;
  beforeAll(async () => {
    await MongoDBConn.getConnection();
    EmpresasDaoInstance = new EmpresasDao(MongoDBConn);
    await EmpresasDaoInstance.init();
    EmpresasInstance = new Empresas(EmpresasDaoInstance);
  });
  it('should be defined', () => {
    expect(EmpresasInstance).toBeDefined();
  });
  it('should insert a new Empresa', async () => {
    const empresa: IEmpresa = {
      codigo: "TS002",
      nombre: "Prueba Empresa desde de Lib",
      status: "Active"
    };
    const result = await EmpresasInstance.add(empresa);
    console.log('Insert Result: ', result);
    expect(result).toBeDefined();
  });
  it('should get all Empresas', async () => {
    const result = await EmpresasInstance.getAll();
    console.log('Get All Result: ', result);
    EmpresasLength = result.length;
    expect(result).toBeDefined();
  });
  it('should get a Empresa by ID', async () => {
    const result = await EmpresasInstance.getAll();
    const id = result[0]._id;
    const empresa = await EmpresasInstance.getById(id);
    console.log('Get by ID Result: ', empresa);
    expect(empresa).toBeDefined();
  });
  it('should update a Empresa', async () => {
    const result = await EmpresasInstance.getAll();
    const id = result[0]._id;
    const empresa = await EmpresasInstance.getById(id);
    const updateEmpresa: IEmpresa = {
      ...empresa,
      nombre: "Empresa Actualizada desde Lib"
    };
    const updateResult = await EmpresasInstance.update(id, updateEmpresa);
    console.log('Update Result: ', updateResult);
    expect(updateResult).toBeDefined();
  });
  it('should delete a Empresa', async () => {
    const result = await EmpresasInstance.getAll();
    const id = result[0]._id;
    const deleteResult = await EmpresasInstance.delete(id);
    console.log('Delete Result: ', deleteResult);
    const newResult = await EmpresasInstance.getAll();
    expect(newResult.length).toBeLessThan(EmpresasLength);
  });
  afterAll(async () => {
    await MongoDBConn.connection.close();
  });
}
);
