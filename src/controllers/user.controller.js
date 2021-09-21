const { createUser } = require("../services/user.service");

const UserController = {
  async register(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const user = await createUser(username, password, email);
      return res.json({
        id: user._id.toString(),
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      const { username, password, email } = req.body;
      const user = await createUser(username, password, email);
      return res.json({
        id: user._id.toString(),
        username: user.username,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
