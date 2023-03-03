import { IDataAccessObject } from "@dao/IDataAccessObject";
import { FodaDao } from "@server/dao/models/FODA/FodaDao";

export class Foda{
  private fodaDao: IDataAccessObject;
  private empresaDao: IDataAccessObject;
  constructor(foda:IDataAccessObject, empresa: IDataAccessObject){
    this.fodaDao = foda;
    this.empresaDao = empresa;
  }
  public async newFoda(nombre: string, empresaId: string){
    try {
      const newFoda = {...{empresa:{id:empresaId}, nombre}};
      const result = await this.fodaDao.create(newFoda);
      console.log('newFoda result:', result);
      const rt = await this.fodaDao.findByFilter({_id:result?.insertedId});
      return rt;
    } catch( ex ) {
      console.error('newFoda error:', ex);
      return  null;
    }
  }
  public async updateFoda (fodaId: string, type: 'F'|'D'|'O'|'A') {
   const result = await (this.fodaDao as FodaDao).updateCounter(fodaId, type);
   console.log('updateFoda:', result);
   const rt = await this.fodaDao.findByID(fodaId);
   return rt;
  }
}

///  const [t5,,t3] = [5,9,3,1,4];
