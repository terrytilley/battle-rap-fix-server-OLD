const faker = require('faker');
const times = require('lodash/times');

const posts = [];

times(20, () => {
  posts.push({
    userId: Math.floor(Math.random() * 10) + 1,
    title: faker.lorem.words(),
    content: faker.lorem.sentence(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
  });
});

module.exports = {
  up: queryInterface => (
    queryInterface.bulkInsert('Posts', posts, {})
  ),

  down: queryInterface => (
    queryInterface.bulkDelete('Posts', null, {})
  ),
};
