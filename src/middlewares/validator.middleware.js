const regexUsername = /^[a-zA-Z0-9_]{6,12}$/;
const regexPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/;
const regexEmail =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const liteEmailChecker = require("lite-email-checker");

const ValidatorMiddleware = {
  async validateRegisterForm(req, res, next) {
    try {
      const { username, password, email } = req.body;
      if (!username || !password || !email) throw "Please fill all";

      const checkUsername = regexUsername.test(username);
      const checkPassword = regexPassword.test(password);
      const checkEmail = regexEmail.test(email);

      if (!checkUsername || !checkPassword || !checkEmail)
        throw "Input invalid";

      const emailChecker = await liteEmailChecker(email);
      // console.log(emailChecker)
      if (!emailChecker) throw "Email address invalid";

      next();
    } catch (error) {
      next(error);
    }
  },
  async validateLoginForm(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) throw "Please fill all";

      const checkUsername = regexUsername.test(username);
      const checkPassword = regexPassword.test(password);

      if (!checkUsername || !checkPassword) throw "Input invalid";

      next();
    } catch (error) {
      next(error);
    }
  },
  async validateToken(req, res, next) {
    try {
      
      next();
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ValidatorMiddleware;
