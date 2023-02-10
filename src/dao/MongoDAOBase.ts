import { Db, Collection, Document, ObjectId, Filter, WithId, OptionalUnlessRequiredId } from 'mongodb';

import { IDataAccessObject } from "./IDataAccessObject";
import { IDBConnection } from './IDBConnection';

export abstract class MongoDAOBase<T> implements IDataAccessObject {
  public persistanceName: string;
  private connection: Db;
  private conectionFactory: IDBConnection;
  private collection: Collection<T>;
  public constructor(entityName: string, connection: IDBConnection) {
    this.persistanceName = entityName;
    this.conectionFactory = connection;
  }
  public async init(){
    this.connection = await this.conectionFactory.getConnection();
    this.collection = this.connection.collection(this.persistanceName);
  }
  findAll() {
    return this.collection.find({}).toArray();
  }
  findByID(id: string) {
    const _id: Filter<T> = new ObjectId(id) as Filter<T>;
    return this.collection.findOne({ _id });
  }
  create(newEntity: Partial<T>){
    return this.collection.insertOne(newEntity as OptionalUnlessRequiredId<T>);
  }
  update(id:string, updateEntity: Partial<T>){
    const _id = new ObjectId(id) as Filter<T>;
    const updateObj = {"$set": updateEntity};
    return this.collection.updateOne({_id}, updateObj);
  }
  delete(id:string){
    const _id = new ObjectId(id) as Filter<T>;
    return this.collection.deleteOne({_id});
  }
  findByFilter: Function;
  findOneByFilter: Function;
  aggregate: Function;
  getConnection() {
    return this.connection;
  }
  rawUpdate: Function;

}
