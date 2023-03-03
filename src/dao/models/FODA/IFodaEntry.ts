import { ObjectId } from "mongodb"

export interface IFodaEntry {
  _id?: string|ObjectId;
  foda: {
    id: string|ObjectId;
  };
  descripcion: string;
  tipo: "F" | "O" | "D" | "A";
  categorias: string[];
  valoracion: number;
  observacion: string;
  logs: {fecha: Date, descripcion: string, usuario: string|ObjectId}[];
}

export const DefaultFodaEntry: IFodaEntry = {
  foda: {
    id: ""
  },
  descripcion: "",
  tipo: "F",
  categorias: [],
  valoracion: 0,
  observacion: "",
  logs: []
}
