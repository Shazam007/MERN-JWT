//get express using es6 syntax --> can use import by changing the packge,json
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const User = require("./models/User.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//creating the express instance
const app = express();

//here cors is the middleware. It manipulate the response and request as needed for security in cross origins
app.use(cors());
app.use(express.json());

//mongo db atlas
const uri =
  "mongodb+srv://shazam007:ViV80q2RW8URq1UF@cluster0.cedms.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected successfully");
  })
  .catch((err) => console.log(err));

//APIs

//create
app.post("/api/register", async (req, res) => {
  console.log(req.body);
  try {
    //create encrypted password
    const encPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: encPassword,
    });
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "Error", error: err });
  }
});

//find a record
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  //check is user is valid
  if (!user) {
    return res.json({ status: "error", error: "no user found" });
  }
  //then need to verify encrypted password when login
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (validPassword) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      "secret7788"
    );

    res.json({ status: "User Found", user: token });
  } else {
    res.json({ status: "Error", error: "User not found" });
  }
});

//find a record
app.get("/api/data", async (req, res) => {
  const token = req.headers["x-access-token"];

  try {
    const decodedToken = jwt.verify(token, "secret7788");
    const email = decodedToken.email;
    const user = await User.findOne({ email: email });

    res.json({ status: "ok", quote: user.quote });
    // return { status: "ok", quote: "dumb" };
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
});

//update a record
app.post("/api/data", async (req, res) => {
  const token = req.headers["x-access-token"];

  console.log("ine data post");

  try {
    const decodedToken = jwt.verify(token, "secret7788");
    const email = decodedToken.email;
    console.log(email);
    console.log(req.body.quote);
    await User.updateOne({ email: email }, { $set: { quote: req.body.quote } });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: "error", error: "invalid token" });
  }
});

//long listening process to listen changes of the server
app.listen(1500, () => {
  console.log("server started on port 1500");
});
