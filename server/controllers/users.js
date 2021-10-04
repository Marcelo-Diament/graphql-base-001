const users = require('../data/users.json')

const controller = {
  index: async (req, res, next) => {
    res.render('users', {
      title: 'Users',
      users
    });
  }
}

module.exports = controller