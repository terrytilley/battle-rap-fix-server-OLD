const bcrypt = require('bcrypt');
const faker = require('faker');
const times = require('lodash/times');

const users = [];
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync('qwerty123', salt);

times(10, () => {
  users.push({
    username: faker.internet.userName().toLowerCase(),
    email: faker.internet.email(),
    password: hash,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  });
});

module.exports = {
  up: queryInterface => (
    queryInterface.bulkInsert('Users', users, {})
  ),

  down: queryInterface => (
    queryInterface.bulkDelete('Users', null, {})
  ),
};
