import {MongoDAOBase} from '@dao/MongoDAOBase';
import { IDBConnection } from '@dao/IDBConnection';
import { IFodaEntry, DefaultFodaEntry } from './IFodaEntry';
import { IDataAccessObject } from '@dao/IDataAccessObject';
import { ObjectId } from 'mongodb';

export class FodaEntryDao extends MongoDAOBase<IFodaEntry> {
  private fodaDao: IDataAccessObject;
  constructor(conexion: IDBConnection, fodaDao: IDataAccessObject){
      super("fodaentry", conexion);
      this.fodaDao = fodaDao;
  }
}
