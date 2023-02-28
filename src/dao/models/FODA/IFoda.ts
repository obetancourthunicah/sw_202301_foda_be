import {ObjectId} from 'mongodb';
import {IAuditable} from '../IAuditable';

export interface IFoda extends IAuditable {
  _id?: ObjectId | string;
  nombre: string;
  owner : {
    id: ObjectId,
    usuario: string,
    email: string
  },
  empresa : {
    id: ObjectId,
    nombre: string
  },
  entradas: number,
  observacion?: string,
  Fcantidad: number,
  Dcantidad: number,
  Ocantidad: number,
  Acantidad: number
}

export const DefaultFoda: IFoda = {
  nombre: '',
  owner: {
    id: new ObjectId,
    usuario: '',
    email: ''
  },
  empresa: {
    id: new ObjectId,
    nombre: ''
  },
  entradas: 0,
  Fcantidad: 0,
  Dcantidad: 0,
  Ocantidad: 0,
  Acantidad: 0,
  createdAt : new Date(),
  updatedAt : new Date()
}

export interface IFodaEntry {

}
