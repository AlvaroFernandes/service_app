//Dependencies
const express = require("express");
const { json, urlencoded } = express;
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

//creating app
const app = express();

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(`DB connection error: ${err}`));

//Middleware
app.use(morgan("dev"));
app.use(cors({ origin: true, credentials: true }));
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressValidator());
//routes
const userRoutes = require("./routes/user");
app.use("/", userRoutes);
//setting port
const port = process.env.PORT || 5000;

//run server
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
