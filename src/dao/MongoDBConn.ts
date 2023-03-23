import { IDBConnection } from "./IDBConnection";
import { MongoClient } from 'mongodb';

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const mongoDBName = process.env.MONGO_DB_NAME || 'sw202301';

export enum MongoDBConnState {
  disconnected = "disconnected",
  connected = "connected",
  connecting = "connecting",
}
export class MongoDBConn implements IDBConnection {
  static connection:MongoClient = null;
  static state =  "disconnected"
	private constructor(){}
  //A hack because typescript can´t handle static methods in interfaces :(
  getConnection(): Promise<any> {
    throw new Error("Method not implemented.");
  }
	public static async getConnection(){
		if(!this.connection && this.state !== MongoDBConnState.connecting){
      this.state = MongoDBConnState.connecting;
      console.log("Connecting to DB", {mongoURI, mongoDBName});
      this.connection = await MongoClient.connect(mongoURI);
      this.state = MongoDBConnState.connected;
		}
    while(this.state === MongoDBConnState.connecting){
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    // console.log("Returning DB connection", {mongoURI, mongoDBName});
    return this.connection.db(mongoDBName);
	}
}
