const { MongoMemoryServer } = require("mongodb-memory-server");
const moduleAlias = require('module-alias');
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
process.env.MONGOMS_DOWNLOAD_URL='https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2204-6.0.5.tgz';
process.env.LOG_LEVEL = 'debug';
process.env.MONGO_URI=process.env.MONGO_URL;
process.env.MONGO_DB_NAME='jestDb';
