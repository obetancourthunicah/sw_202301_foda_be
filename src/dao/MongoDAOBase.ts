import { Db, Collection, Document, ObjectId, Filter, WithId } from 'mongodb';

import { IDataAccessObject } from "./IDataAccessObject";

export abstract class MongoDAOBase<T> implements IDataAccessObject {
  public persistanceName: string;
  private connection: Db;
  private collection: Collection<T>;
  public constructor(entityName: string, connection: Db) {
    this.persistanceName = entityName;
    this.connection = connection;
    this.collection = this.connection.collection(this.persistanceName);
  }
  findAll() {
    return this.collection.find({}).toArray();
  }
  findByID(id: string) {
    const _id: Filter<T> = new ObjectId(id) as Filter<T>;
    return this.collection.findOne({ _id });
  }
  create: Function;
  update: Function;
  delete: Function;
  findByFilter: Function;
  findOneByFilter: Function;
  aggregate: Function;
  getConnection() {
    return this.connection;
  }
  rawUpdate: Function;

}
