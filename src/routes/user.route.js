const express = require("express");
const userRouter = express.Router();
const { register, login, profile } = require("../controllers/user.controller");
const {
  validateRegisterForm,
  validateLoginForm,
  validateToken,
} = require("../middlewares/validator.middleware");

const { authUser } = require("../middlewares/user.middleware");

userRouter.post("/register", validateRegisterForm, register);
userRouter.post("/login", validateLoginForm, login);
userRouter.get("/profile", validateToken, authUser, profile);

module.exports = userRouter;
