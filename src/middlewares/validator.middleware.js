const regexUsername = /^[a-zA-Z0-9_]{6,12}$/;
const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/;
const liveEmailValidator = require("live-email-validator");
const jwt = require("jsonwebtoken");

const ValidatorMiddleware = {
  async validateRegisterForm(req, res, next) {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) throw "Please fill all";

      const isUsernameValid = regexUsername.test(username);
      if (!isUsernameValid) throw "Username invalid";

      const isPasswordValid = regexPassword.test(password);
      if (!isPasswordValid) throw "Password invalid";

      const isEmailValid = await liveEmailValidator.validate(email);
      if (!isEmailValid) throw "Email address invalid";

      next();
    } catch (error) {
      next(error);
    }
  },
  async validateLoginForm(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) throw "Please fill all";

      const isUsernameValid = regexUsername.test(username);
      if (!isUsernameValid) throw "Username invalid";

      const isPasswordValid = regexPassword.test(password);
      if (!isPasswordValid) throw "Password invalid";

      next();
    } catch (error) {
      next(error);
    }
  },
  async validateToken(req, res, next) {
    try {
      // console.log(req.cookies);
      const { accessToken } = req.cookies;
      if (!accessToken) throw "Unauthorized";

      await jwt.verify(accessToken, process.env.SECRET, (error, decoded) => {
        if (error) throw "Unauthorized";
        // console.log(decoded);
        if (decoded.exp * 1e3 < Date.now()) throw "Session expired";
        req.headers.authorizer = decoded;
      });

      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ValidatorMiddleware;
