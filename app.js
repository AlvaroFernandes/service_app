const express = require("express");
const colors = require("colors");
const app = express();

//dependecies
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");

app.use(cookieParser());
app.use(express.json());

//data base connection
const connectDB = require("./db/connection");
connectDB();

const userRouter = require("./routes/User");
const jobsRouter = require("./routes/Jobs");
app.use("/user", userRouter);
app.use("/jobs", jobsRouter);

app.use(errorHandler);

//listner
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`.red.underline);
});
