const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const config = {
  dbname: 'my-cosmos-react-heroes',
  key: 'MyHH3NugpXcuJqNbNXDMSw3njpGfExd65U4Xm17ypYuXCHApZB22CtvkHuJCEjUls863ol09fvg4y6suhKBXUg==',
  port: 10255
}

const mongoUri = `mongodb://${config.dbname}:${config.key}@${config.dbname}.documents.azure.com:${config.port}/?ssl=true`;

function connect() {
  return mongoose.connect(mongoUri, { useMongoClient: true });
}

module.exports = {
  connect,
  mongoose
};