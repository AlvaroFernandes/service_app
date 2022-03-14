//Dependencies
const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//creating app
const app = express();

app.use(cookieParser());
app.use(express.json());

//setting port
const port = process.env.PORT || 5000;

//connect to db
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log(`Connected to DB`);
});

const userRouter = require("./routes/User");
app.use("/user", userRouter);

//run server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
