import express from 'express';
const router  = express.Router();

import {validateKeyMiddleWare} from './middlewares/apikeyValidator';
import {validateJwtMiddleWare} from './middlewares/jwtTokenValidator';


// REST API
// Internet  ->  HTTP  ->  REST API JSON ->  DB
// SOAP XML wsdl
// {} -> JSON
// [] -> JSON
// { llave : valor }
// valor: texto, numérico, booleano, array [valores], objeto {llave:valor}

// REST stateless, resource unique representation
// CRUD Create, Read, Update, Delete
//      POST, GET, PUT, DELETE

// http://localhost:3001
router.get('/', (_req, res) => {
  res.json({msg:'Hello World!'});
 });

// http://localhost:3001/version
router.get('/version', (_req, res)=>{
  const version: string = "1.0.0";
  const jsonResp = {"name":"FODA Be", "version": version};
  // string, number, boolean, types, interfaces, classes, enumerators
  res.json(jsonResp);
 });

import securityRoutes from './security/security';
// Aplicar Middlewares
router.use('/security', securityRoutes);
import empresasRouter from './empresas/empresas';
router.use('/empresas', validateKeyMiddleWare, validateJwtMiddleWare, empresasRouter);

import fodaRouter from './foda/foda';
router.use('/foda', validateKeyMiddleWare, validateJwtMiddleWare, fodaRouter);
 //router.get  router.post router.put router.delete  router.use

export default router;
