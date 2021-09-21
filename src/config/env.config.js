const fs = require("fs");
const dotenv = require("dotenv");

const ConfigEnv = {
  checkEnv() {
    try {
      fs.readFileSync(".dev");
      dotenv.config({ path: ".dev.env" });
    } catch (error) {
      dotenv.config({ path: ".prod.env" });
    }
  },
};

module.exports = ConfigEnv;
