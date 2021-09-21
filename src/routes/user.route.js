const express = require("express");
const userRouter = express.Router();
const { register } = require("../controllers/user.controller");
const { authUser } = require("../middlewares/user.middleware");

userRouter.post("/register", register);

module.exports = userRouter;
