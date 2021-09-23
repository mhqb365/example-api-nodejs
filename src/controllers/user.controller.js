const {
  checkUsernameExsit,
  checkEmailExsit,
  createUser,
  getUser,
} = require("../services/user.service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserController = {
  async register(req, res, next) {
    try {
      let { username, password, email } = req.body;
      password = await bcrypt.hash(password, 10);
      const usernameExsit = await checkUsernameExsit(username);
      // console.log(usernameExsit);
      if (usernameExsit) throw "Username already in use";
      const emailExsit = await checkEmailExsit(email);
      // console.log(emailExsit);
      if (emailExsit) throw "Email already in use";

      const newUser = await createUser(username, password, email);
      const token = jwt.sign(
        {
          username: newUser.username,
          permission: newUser.permission,
        },
        process.env.SECRET,
        {
          expiresIn: "30d",
          algorithm: "HS512",
        }
      );

      res.cookie("accessToken", token, {
        maxAge: 1e3 * 6e1 * 6e1 * 24 * 3e1,
        httpOnly: true,
      });

      return res.json({
        _id: newUser._id.toString(),
        username: newUser.username,
        permission: newUser.permission,
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    try {
      let { username, password } = req.body;
      const user = await checkUsernameExsit(username);
      // console.log(user);

      const testPassword = await bcrypt.compare(password, user.password);
      if (!testPassword) throw "Wrong password";

      const token = jwt.sign(
        {
          username: user.username,
          permission: user.permission,
        },
        process.env.SECRET,
        {
          expiresIn: "30d",
          algorithm: "HS512",
        }
      );

      res.cookie("accessToken", token, {
        maxAge: 1e3 * 6e1 * 6e1 * 24 * 3e1,
        httpOnly: true,
      });

      return res.json({
        _id: user._id.toString(),
        username: user.username,
        permission: user.permission,
      });
    } catch (error) {
      next(error);
    }
  },
  async profile(req, res, next) {
    try {
      const { username } = req.headers.authorize;
      const user = await getUser(username);

      return res.send({
        _id: user._id.toString(),
        username: user.username,
        email: user.email,
        permission: user.permission,
      });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = UserController;
