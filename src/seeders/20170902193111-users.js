module.exports = {
  up: queryInterface => (
    queryInterface.bulkInsert('Users', [
      {
        email: 'terry@terrytilley.com',
        username: 'terryt88',
        createdAt: '2017-09-02T19:40:14.475Z',
        updatedAt: '2017-09-02T19:40:14.475Z',
      },
      {
        email: 'reece@reecefreed.com',
        username: 'reecef90',
        createdAt: '2017-09-02T19:40:14.475Z',
        updatedAt: '2017-09-02T19:40:14.475Z',
      },
      {
        email: 'jason@jasonmaddrell.com',
        username: 'jasonm88',
        createdAt: '2017-09-02T19:40:14.475Z',
        updatedAt: '2017-09-02T19:40:14.475Z',
      },
      {
        email: 'jack@jackwalker.com',
        username: 'jackw88',
        createdAt: '2017-09-02T19:40:14.475Z',
        updatedAt: '2017-09-02T19:40:14.475Z',
      },
    ], {})
  ),

  down: queryInterface => (
    queryInterface.bulkDelete('Users', null, {})
  ),
};
