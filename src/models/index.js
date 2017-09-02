import Sequelize from 'sequelize';

const sequelize = new Sequelize('graphql_server_db', 'graphql_server_admin', 'qwerty', {
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
