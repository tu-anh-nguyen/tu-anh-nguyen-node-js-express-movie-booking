const authControllers = {
  login: require('./login'),
  register: require('./register'),
  updateProfile: require('./updateProfile'),
  getProfile: require('./getProfile'),
};

module.exports = authControllers;
