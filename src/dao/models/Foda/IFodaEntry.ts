import { ObjectId } from "mongodb"
import { IAuditable } from "../IAuditable";

export enum EFodaType {
  "Fortaleza" = "Z",
  "Oportunidad" = "O",
  "Debilidad" = "D",
  "Amenaza" = "A"
}

export interface IFodaEntry extends IAuditable {
  _id?: string | ObjectId;
  foda: {
    id: string | ObjectId;
  };
  descripcion: string;
  tipo: EFodaType;
  categorias: string[];
  valoracion: number;
  observacion: string;
  logs: { fecha: Date, descripcion: string, usuario: string | ObjectId }[];
}

export const DefaultFodaEntry = (): IFodaEntry => {
  const df: IFodaEntry = {
    foda: {
      id: ""
    },
    descripcion: "",
    tipo: EFodaType.Fortaleza,
    categorias: [],
    valoracion: 0,
    observacion: "",
    logs: [],
    createdAt: new Date(),
    updatedAt: new Date()
  };
  return df;
}
