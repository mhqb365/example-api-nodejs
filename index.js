const express = require("express");
const cors = require("cors");
const app = express();
const { checkEnv } = require("./src/config/env.config");
const userRouter = require("./src/routes/user.route");
const { connectDatabase } = require("./src/config/database.config");
const cookieParser = require("cookie-parser");

checkEnv();
connectDatabase();

const corsOptions = {
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'))

app.use("/user", userRouter);

app.listen(process.env.PORT, () =>
  console.log(
    `api with ${process.env.MODE} mode run at port ${process.env.PORT}`
  )
);
