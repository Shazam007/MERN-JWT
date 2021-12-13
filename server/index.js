//get express using es6 syntax --> can use import by changing the packge,json
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//creating the express instance
const app = express();

//here cors is the middleware. It manipulate the response and request as needed for security in cross origins
app.use(cors());
app.use(express.json());

//mongo db atlas
const uri =
  "mongodb+srv://shazam007:kaviamd7788@cluster0.cedms.mongodb.net/simpleJWT?retryWrites=true&w=majority";

app.post("/api/register", (req, res) => {
  console.log(req.body);
});

//long listening process to listen changes of the server
app.listen(1500, () => {
  console.log("server started on port 1500");
});
