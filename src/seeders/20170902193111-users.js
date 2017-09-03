const faker = require('faker');
const times = require('lodash/times');

const users = [];

times(10, () => {
  users.push({
    username: faker.internet.userName().toLowerCase(),
    email: faker.internet.email(),
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
