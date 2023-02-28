import { IFoda } from "@dao/models/FODA/IFoda";
import { IEmpresa } from "@dao/models/Empresas/IEmpresas";
import { IDataAccessObject } from "@dao/IDataAccessObject";

export class Foda{
  private fodaDao: IDataAccessObject;
  private empresaDao: IDataAccessObject;
  constructor(foda:IDataAccessObject, empresa: IDataAccessObject){
    this.fodaDao = foda;
    this.empresaDao = empresa;
  }
}
