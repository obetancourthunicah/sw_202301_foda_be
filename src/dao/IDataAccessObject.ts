export interface IDataAccessObject {
  findAll: Function;
  findByID: Function;
  create: Function;
  update: Function;
  delete: Function;
  findByFilter: Function;
  findOneByFilter: Function;
  aggregate: Function;
  getConnection: Function;
  rawUpdate: Function;
}
