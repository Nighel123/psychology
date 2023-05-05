// server/index.js

const express = require("express");
let bodyParser = require("body-parser");
const cors = require("cors");
const logger = require('morgan');


const PORT = process.env.PORT || 3001;

//console.log("right here")
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(bodyParser.text());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
//const path = require('path');

//app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
  res.json({ message:'You are my brother who loves me. But you never really had time for me.  Me: "Do you love me?" Brother: "Yes I love you! I only always had problems to express my feelings since I never learned how to do that in my childhood!" Me: "Would you like to know how I feel?" '});
});

app.post("/api", (req, res) => {
	console.log(req.body.text);
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Visit on http://localhost:3001/api`);
});
