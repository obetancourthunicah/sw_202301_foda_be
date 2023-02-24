import { IEmpresa } from "@dao/models/Empresas/IEmpresas";
import { IDataAccessObject } from "@dao/IDataAccessObject";
export class Empresas {
  private dao: IDataAccessObject;
  constructor(dao: IDataAccessObject) {
    this.dao = dao;
  }
  getAll() {
    return this.dao.findAll();
  }
  getById(id: string) {
    return this.dao.findByID(id);
  }
  add(nuevaEmpresa: IEmpresa) {
    const date = new Date();
    const nueva: IEmpresa = {
      ...nuevaEmpresa,
      created: date,
      updated: date
    }
    return this.dao.create(nueva);
  }

  update(id: string, updateEmpresa: IEmpresa) {
    const updateObject = { ...updateEmpresa, updated: new Date() };
    return this.dao.update(id, updateObject);
  }

  delete(id: string) {
    return this.dao.delete(id);
  }
}
