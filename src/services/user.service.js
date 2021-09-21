const UserModel = require("../models/user.model");

const UserService = {
  async createUser(username, password, email) {
    try {
      const newUser = new UserModel({
        username,
        password,
        email,
      });
      return await newUser.save();
    } catch (error) {
      console.log(error.message);
    }
  },
  async checkUser(username, password) {
    try {
      return await UserModel.findOne({
        username,
        password,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};

module.exports = UserService;
