import express from 'express';
import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { FodaDao } from '@dao/models/FODA/FodaDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import {Foda} from '@libs/FODA/Foda';
import { Empresas } from '@libs/Empresas/Empresas';

const empresasDao = new EmpresasDao(MongoDBConn);
let fodaDao;
let empresasModel:Empresas;
let fodaModel:Foda;
empresasDao.init().then(()=>{
  empresasModel = new Empresas(empresasDao);
  fodaDao = new FodaDao(MongoDBConn, empresasDao);
  fodaDao.init().then(()=>{
    fodaModel = new Foda(fodaDao, empresasDao);
  });
});
const router = express.Router();


router.post('/:empresa/new', async (req, res)=>{
  const { empresa }  = req.params as {empresa:string};
  const { nombre } = req.body;
  const result = await fodaModel.newFoda(nombre, empresa);
  return res.status(200).json(result);
});

router.put('/:empresa/tmp/:fodaId', async (req, res)=>{
  const {fodaId} = req.params;
  const {type} = req.body;
  const updt = await fodaModel.updateFoda(fodaId, type);
  return res.status(200).json(updt);
});

export default router;
