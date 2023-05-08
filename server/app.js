// server/index.js
const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const helpers = require("./modules/Helpers").helpers;
const { talkModel, User } = require("./modules/models");
require("./modules/Database").connect();

require("dotenv").config();
const { NODE_ENV } = process.env;

const app = express();

const c = console.log;

if (process.env.NODE_ENV === "development") {
  c("Running Node Server in Development Enviroment");
  const cors = require("cors");
  const logger = require("morgan");
  app.use(logger("dev"));
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Got the code from here: www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/https:
app.post("/register", async (req, res) => {
  // Our register logic starts here
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body;

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    // save user token
    user.token = token;

    // return new user
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/login", async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2d",
        }
      );

      // save user token
      user.token = token;

      // user
      // res.status(200).json(user);
      res.status(200).json(token); // this is from me
    } else {
      res.status(400).send("Invalid Credentials");
    }
  } catch (err) {
    console.log(err);
  }
  // Our register logic ends here
});

app.post("/login2", (req, res) => {
  res.send({
    token: "test123",
  });
});

//This is for production: https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/amp/
if (process.env.NODE_ENV === "production") {
  c("Running Node Server in Production Enviroment");
  app.use(express.static(path.resolve(__dirname, "../client/build")));
}

app.get("/api/:helper", async (req, res) => {
  const helperName = req.params.helper.toLowerCase();
  const helper = helpers[helperName];
  const heading = helper.relation + ": " + helper.name;
  let resObj = new Object();
  const talk = await talkModel.findOne({ helper: helperName });
  if (talk) {
    resObj = {
      heading: heading,
      text: talk.text,
    };
  } else {
    resObj = {
      heading: heading,
      text: helper.chatName + ": " + helper.firstQuest + helper.answerPrompt,
    };
    let talkDoc = new talkModel({ helper: helperName, text: resObj.text });
    await talkDoc.save({ helper: helperName, text: resObj.text });
  }
  res.json(resObj);
});

app.post("/api/:helper", async (req, res) => {
  let helperName = req.params.helper.toLowerCase();
  const helper = helpers[helperName];
  let ans = await helper.Fragen(req.body.text);
  ans = req.body.text + ans + helper.answerPrompt;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ text: ans }));

  await talkModel.updateOne({ helper: helperName }, { $set: { text: ans } });
});

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

module.exports = app;
