const mongoose = require("mongoose");

const ConfigDatabase = {
  async connectDatabase() {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log(`database connected`);
    } catch (error) {
      console.error(error);
    }
  },
};

module.exports = ConfigDatabase;
