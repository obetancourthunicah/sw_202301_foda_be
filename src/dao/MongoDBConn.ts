import { IDBConnection } from "./IDBConnection";
import { MongoClient } from 'mongodb';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const mongoDBName = process.env.MONGO_DB_NAME || 'sw202301';

export class MongoDBConn implements IDBConnection {
  static connection:MongoClient = null;
	private constructor(){}
	public static async getConnection(){
		if(!this.connection){
      this.connection = await MongoClient.connect(mongoURI);
		}
    return this.connection.db(mongoDBName);
	}
}
