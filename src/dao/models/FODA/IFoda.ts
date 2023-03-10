import { ObjectId } from 'mongodb';
import { IAuditable } from '../IAuditable';

export enum IFodaEstados {
  Planning = "P",
  Execution = "E",
  Finished = "F",
  Canceled = "C"
}
export interface IFoda extends IAuditable {
  _id?: ObjectId | string;
  nombre: string;
  owner: {
    id: ObjectId | string,
    usuario: string,
    email: string
  },
  empresa: {
    id: ObjectId | string,
    nombre?: string
  },
  estado: IFodaEstados,
  entradas: number,
  observacion?: string,
  Fcantidad: number,
  Dcantidad: number,
  Ocantidad: number,
  Acantidad: number
}

export const DefaultFoda = (): IFoda => {
  const df: IFoda = {
    nombre: '',
    owner: {
      id: '',
      usuario: '',
      email: ''
    },
    empresa: {
      id: '',
      nombre: ''
    },
    entradas: 0,
    Fcantidad: 0,
    Dcantidad: 0,
    Ocantidad: 0,
    Acantidad: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    estado: IFodaEstados.Planning
  };
  return df;
}
