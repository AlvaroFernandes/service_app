const express = require("express");
const app = express();

//dependecies
const cookieParser = require("cookie-parser");
require("dotenv").config();

app.use(cookieParser());
app.use(express.json());

//data base connection
const connect = require("./db/connection");
connect.connection();

const userRouter = require("./routes/User");
app.use("/user", userRouter);

//listner
app.listen(process.env.PORT, () => {
  console.log("Server runing");
});
