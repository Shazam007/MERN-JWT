const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    quote: {
      type: String,
    },
  },
  { collection: "user-data" }
);

const model = mongoose.model("userData", User);

module.exports = model;

//module.exports = mongoose.model("userData", User); is also valid
