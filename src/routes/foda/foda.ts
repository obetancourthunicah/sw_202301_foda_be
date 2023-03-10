import express from 'express';
import { EmpresasDao } from '@dao/models/Empresas/EmpresasDao';
import { FodaDao } from '@dao/models/Foda/FodaDao';
import { MongoDBConn } from '@dao/MongoDBConn';
import {Foda} from '@libs/Foda/Foda';

const empresasDao = new EmpresasDao(MongoDBConn);
let fodaDao;
let fodaModel:Foda;
empresasDao.init().then(()=>{
  fodaDao = new FodaDao(MongoDBConn, empresasDao);
  fodaDao.init().then(()=>{
    fodaModel = new Foda(fodaDao);
  });
});
const router = express.Router();

router.get('/:empresa/foda', async (req, res)=>{
  const {empresa} = req.params;
  const fodas = await fodaModel.getAllFromEmpresa(empresa);
  return res.status(200).json(fodas);
});

router.post('/:empresa/new', async (req, res)=>{
  const { empresa }  = req.params as {empresa:string};
  const { nombre } = req.body;
  const result = await fodaModel.newFoda(nombre, empresa);
  return res.status(200).json(result);
});

router.put('/:empresa/tmp/:fodaId', async (req, res)=>{
  const {fodaId} = req.params;
  const {type} = req.body;
  const updObject = await fodaModel.updateFoda(fodaId, type);
  return res.status(200).json(updObject);
});

router.put('/:empresa/upd/:fodaId/nombre', async (req, res)=>{
  const {fodaId} = req.params;
  const {nombre} = req.body;
  const updObject = await fodaModel.setNombre(fodaId, nombre);
  return res.status(200).json(updObject);
});
router.put('/:empresa/upd/:fodaId/estado', async (req, res)=>{
  const {fodaId} = req.params;
  const {estado} = req.body;
  const updObject = await fodaModel.setEstado(fodaId, estado);
  return res.status(200).json(updObject);
});
router.put('/:empresa/upd/:fodaId/observacion', async (req, res)=>{
  const {fodaId} = req.params;
  const {observacion} = req.body;
  const updObject = await fodaModel.setObservation(fodaId, observacion);
  return res.status(200).json(updObject);
});

export default router;
