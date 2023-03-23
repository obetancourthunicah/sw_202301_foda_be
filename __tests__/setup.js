const { MongoMemoryServer } = require("mongodb-memory-server");
process.env.LOG_LEVEL = 'debug';
process.env.MONGO_URI=process.env.MONGO_URL;
process.env.MONGO_DB_NAME='jestDb';
