require("dotenv").config();
const express = require("express");
const colors = require("colors");
const app = express();
const errorHandler = require("./middleware/errorMiddleware");
//dependecies
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

//data base connection
const connectDB = require("./db/connection");
connectDB();

const authRouter = require("./routes/Auth");
const userRouter = require("./routes/Users");
const jobsRouter = require("./routes/Jobs");
const clientsRouter = require("./routes/Clients");

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/jobs", jobsRouter);
app.use("/clients", clientsRouter);

app.use(errorHandler);

//listner
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`Server running on port: ${port}`.red.underline);
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged error: ${err}`);
  server.close(() => process.exit(1));
});
