import { MongoDAOBase } from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { IFoda, DefaultFoda } from './IFoda';
import { IDataAccessObject } from '@dao/IDataAccessObject';
import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { ObjectId } from 'mongodb';
import { EFodaType } from './IFodaEntry';

export class FodaDao extends MongoDAOBase<IFoda> {
  private empresaDao: EmpresasDao;
  constructor(conexion: IDBConnection, empresaDao: IDataAccessObject) {
    super("foda", conexion);
    this.empresaDao = empresaDao as EmpresasDao;
  }
  public async create(foda: Partial<IFoda>) {
    const { empresa: { id } } = foda;
    if (!ObjectId.isValid(id)) {
      throw Error("Empresa Object Id not Valid")
    }
    const { _id, nombre } = await this.empresaDao.findByID(id.toString());
    const newFoda = {
      ...DefaultFoda(),
      ...foda,
      ...{ empresa: { id: _id, nombre } },
      ...{ createdAt: new Date(), updatedAt: new Date() }
    };
    return super.create(newFoda);
  }
  public async updateCounter(fodaId: string | ObjectId, type: EFodaType) {
    let oFodaId = typeof fodaId == 'string' ? new ObjectId(fodaId) : fodaId;
    let filter = { _id: oFodaId };
    let updCmd = { "$inc": { "entradas": 1 }, "$set": { "updatedAt": new Date() } }
    updCmd["$inc"][`${type}cantidad`] = 1;
    console.log('updateCounter:', { updCmd, oFodaId });
    return super.rawUpdate(filter, updCmd);
  }
}
