const UserModel = require("../models/user.model");

const UserService = {
  async checkUsernameExsit(username) {
    try {
      return await UserModel.findOne({ username });
    } catch (error) {
      throw error;
    }
  },
  async checkEmailExsit(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  },
  async createUser(username, password, email) {
    try {
      const newUser = new UserModel({ username, password, email });

      return await newUser.save();
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserService;
