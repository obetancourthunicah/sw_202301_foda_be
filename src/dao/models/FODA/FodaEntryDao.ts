import {MongoDAOBase} from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { IFodaEntry, DefaultFodaEntry } from './IFodaEntry';
import { IDataAccessObject } from '@dao/IDataAccessObject';
import { FodaDao } from './FodaDao';

export class FodaEntryDao extends MongoDAOBase<IFodaEntry> {
  private fodaDao: FodaDao;
  constructor(conexion: IDBConnection, fodaDao: IDataAccessObject){
      super("fodaentry", conexion);
      this.fodaDao = fodaDao as FodaDao;
  }
  public async create(fodaEntry: Partial<IFodaEntry>){
    const {foda: {id: FodaId = ''}} = fodaEntry;
    if(typeof FodaId === "string") {
      if (!this.isValidId(FodaId)) {
        throw new Error("Invalid Id for Foda Entry");
      }
      const fodaInDb = await this.fodaDao.findByID(FodaId, {projection:{_id:1}});
      if (fodaInDb) {
        fodaEntry.foda.id = fodaInDb._id;
      } else {
        throw new Error(`Foda not found for FODA id: ${FodaId}`);
      }
    }
    const newFodaEntry = {
      ...DefaultFodaEntry(),
      ...fodaEntry
    };
    return super.create(newFodaEntry);
  }
}
