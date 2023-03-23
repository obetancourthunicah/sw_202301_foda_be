import express from 'express';
import cors from 'cors';
import rootRoute from '@routes/index';
import errorHandler from './expressError';
import expressNotFound from './expressNotFound';
import expressLogger from './expressLogger';
const origins = process.env.ORIGINS?.split(',') || [];
const createServer = async () => {
  const app = express();
  app.use(express.urlencoded({ extended: true }));
  app.use(expressLogger);
  if (origins.length > 0 && process.env.NODE_ENV === 'production') {
    app.use(cors((req) => {
      if (origins.includes(req.header('Origin'))) {
        return { origin: true };
      }
      return { origin: false };
    }));
  } else {
    if (process.env.NODE_ENV !== 'production') {
      app.use(cors({origin:'localhost:3001'}));
    } else {
      throw new Error('No se ha definido la variable de entorno ORIGINS');
    }
  }

  console.log(origins);

  app.use(express.json());
  app.disable('x-powered-by');
  const rs = await rootRoute();
  app.use('/', rs);
  app.use(expressNotFound);
  app.use(errorHandler);
  return app;
};

export { createServer };
