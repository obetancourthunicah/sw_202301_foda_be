const { MongoMemoryServer } = require("mongodb-memory-server");
process.env.MONGOMS_DOWNLOAD_URL='https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu2204-6.0.5.tgz';
process.env.LOG_LEVEL = 'debug';
process.env.MONGO_URI=process.env.MONGO_URL;
process.env.MONGO_DB_NAME='jestDb';
