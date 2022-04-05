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

const authRouter = require("./routes/Auth");
const userRouter = require("./routes/Users");
const jobsRouter = require("./routes/Jobs");
const clientsRouter = require("./routes/Clients");
const staffsRouter = require("./routes/Staffs");

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/jobs", jobsRouter);
app.use("/clients", clientsRouter);
app.use("/staffs", staffsRouter);

app.use(errorHandler);

//listner
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`.red.underline);
});
