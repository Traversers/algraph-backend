const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const customEnv = require("custom-env");

const userRouter = require("./routes/user.router");
const graphRouter = require("./routes/graph.router");

const newLocal = customEnv.env(process.env.NODE_ENV, "./config");
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_SERVER_ORIGIN,
    optionsSuccessStatus: 200,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, process.env.STATIC_PATH)));
app.use("/graph", graphRouter);
app.use("/user", userRouter);
app.listen(process.env.PORT, () =>
  console.log(`sever is listening to port ${process.env.PORT}`)
);
