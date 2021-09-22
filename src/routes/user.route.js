const express = require("express");
const userRouter = express.Router();
const { register, login } = require("../controllers/user.controller");
const {
  validateRegisterForm,
  validateLoginForm,
} = require("../middlewares/validator.middleware");

const { authUser } = require("../middlewares/user.middleware");

userRouter.post("/register", validateRegisterForm, register);
userRouter.post("/login", validateLoginForm, login);

module.exports = userRouter;
