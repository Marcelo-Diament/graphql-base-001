const controller = {
  index: async (req, res, next) => {
    res.render('users', {
      title: 'Users'
    });
  }
}

module.exports = controller