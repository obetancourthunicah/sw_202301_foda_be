import express from 'express';
import securityRoutes from './security/security';
import { validateKeyMiddleWare } from './middlewares/apikeyValidator';
import { validateJwtMiddleWare } from './middlewares/jwtTokenValidator';
import empresasRouter from './empresas/empresas';
import fodaRouter from './foda/foda';
let router;
export const getRouter = async () => {
  router = express.Router();

  router.get('/', (_req, res) => {
    res.json({ msg: 'Hello World!' });
  });

  // http://localhost:3001/version
  router.get('/version', (_req, res) => {
    const version: string = "1.0.0";
    const jsonResp = { "name": "FODA Be", "version": version };
    // string, number, boolean, types, interfaces, classes, enumerators
    res.json(jsonResp);
  });
  const sr = await securityRoutes();
  const er = await empresasRouter();
  const fr = await fodaRouter();
  router.use('/security', validateKeyMiddleWare, sr);
  router.use('/empresas', validateKeyMiddleWare, validateJwtMiddleWare, er);
  router.use('/foda', validateKeyMiddleWare, validateJwtMiddleWare, fr);

  return router;
};

export default getRouter;
