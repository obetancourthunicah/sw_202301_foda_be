import { IDataAccessObject } from "@dao/IDataAccessObject";
import { FodaEntryDao } from "@dao/models/Foda/FodaEntryDao";
import { IFoda } from "@dao/models/Foda/IFoda";
import { FodaDao } from "@server/dao/models/Foda/FodaDao";
import { EFodaType } from "@server/dao/models/Foda/IFodaEntry";

export class FodaEntry {
  private fodaEntryDao: FodaEntryDao;
  private fodaDao: FodaDao;
  constructor(
    fodaEntry: IDataAccessObject,
    foda: IDataAccessObject
  ) {
    this.fodaEntryDao = fodaEntry as FodaEntryDao;
    this.fodaDao = foda as FodaDao;
  }
  public async newFodaEntry(fodaId: string, descripcion:string, fodaType: EFodaType, observacion) {
    try {
      const newFodaEntry = {descripcion, tipo:fodaType, foda:{id:fodaId}, observacion};
      const result = await this.fodaEntryDao.create(
        newFodaEntry
      );
      console.log('newFodaEntry result:', result);
      const rt = await this.fodaEntryDao.findByFilter({ _id: result?.insertedId });
      this.fodaDao.updateCounter(fodaId, fodaType);
      return rt;
    } catch (ex) {
      console.error('newFoda error:', ex);
      return null;
    }
  }
}

///  const [t5,,t3] = [5,9,3,1,4];
