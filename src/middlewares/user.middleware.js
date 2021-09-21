const UserModel = require("../models/user.model");

const UserMiddleware = {
  authUser(req, res, next) {
    try {
      next();
    } catch (error) {
      console.error(error);
      res.status(404).send("Not found");
    }
  },
};

module.exports = UserMiddleware;
