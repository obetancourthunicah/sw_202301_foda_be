import * as moduleAlias from 'module-alias';
import logger from '@utils/logger';
const srcPath = './src';
moduleAlias.addAliases({
  "@config": `${srcPath}/config`,
  "@handlers": `${srcPath}/handlers`,
  "@libs": `${srcPath}/libs`,
  "@middleware": `${srcPath}/middleware`,
  "@routes": `${srcPath}/routes`,
  "@utils": `${srcPath}/utils`,
  "@dao": `${srcPath}/dao`
});

import { createServer } from '@config/express';
import { MongoDBConn } from '@dao/MongoDBConn';
import { AddressInfo } from 'net';
import http from 'http';

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3001;
const startServer = () => {
  createServer().then((app) => {
    const server = http.createServer(app);
    server.listen({ host, port }, () => {
      const address = server.address() as AddressInfo;
      logger.info(`Server is running on http://${address.address}:${address.port}`);
    });
    const signalTraps: NodeJS.Signals[] = ['SIGTERM', 'SIGINT', 'SIGUSR2'];
    signalTraps.forEach((type) => {
      process.once(type, async () => {
        try {
          logger.info(`Process ${type} signal received`);
          logger.info('Closing http server');
          server.close(() => {
            MongoDBConn.connection.close();
            logger.info('Http server closed');
            process.exit(0);
          }
          );
        } catch (error) {
          console.error(`Error occurred while closing http server: ${error}`);
          process.exit(1);
        }
      });
    });
  });
};

MongoDBConn.getConnection().then(() => {
  startServer();
}).catch((error) => {
  console.error("No se pudo conectar a la DB", error);
});
