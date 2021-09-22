const UserModel = require("../models/user.model");

const UserMiddleware = {
  authUser(req, res, next) {
    try {
      next();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserMiddleware;
