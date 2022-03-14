//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

//creating app
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

const userRouter = require("./routes/User");
app.use("/user", userRouter);


//setting port
const port = process.env.PORT || 5000;

//connect to db
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log(`Connected to DB`);
});



//run server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
