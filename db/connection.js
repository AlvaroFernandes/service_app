const mongoose = require("mongoose");
require("dotenv").config();

exports.connection = () => {
  mongoose.connect(process.env.MONGO_URL).then(
    () => console.log("DB Connected"),
    (error) => console.log(error)
  );
};
