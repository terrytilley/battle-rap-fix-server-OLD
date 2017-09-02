import Sequelize from 'sequelize';
import { database, username, password } from '../config/config.json';

const sequelize = new Sequelize(database, username, password, {
  host: 'localhost',
  dialect: 'postgres',
});

const db = {
  User: sequelize.import('./user'),
};

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
