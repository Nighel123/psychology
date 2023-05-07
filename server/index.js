// server/index.js
const express = require("express");
const helpers = require("./modules/Helpers").helpers
const talkModel = require("./modules/models")
require('dotenv').config()
const c = console.log
const path = require('path');
const mongoose = require('mongoose')

const PORT = process.env.PORT || 3001;

const app = express();

if (process.env.NODE_ENV === 'development') {
    c("Running Node Server in Development Enviroment")
    const cors = require("cors");
    const logger = require('morgan');
    app.use(logger('dev'));
    app.use(
      cors({
        origin: 'http://localhost:3000',
        credentials: true,
      })
    );
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect(process.env.MONGOOSE_CONNECT_LINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//This is for production: https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/amp/
if (process.env.NODE_ENV === 'production') {
    c("Running Node Server in Production Enviroment")
    app.use(express.static(path.resolve(__dirname, '../client/build')));
}

app.get("/api/:helper", async (req, res) => {
	const helperName = req.params.helper.toLowerCase()
    const helper = helpers[helperName]
    const heading = helper.relation + ": " + helper.name;
    let resObj = new Object;
    const talk = await talkModel.findOne({helper:helperName})
    if (talk) {
        resObj = { 
            heading: heading,
            text: talk.text,
        }
    } else {
        resObj = { 
            heading: heading,
            text: helper.chatName + ": " + helper.firstQuest + helper.answerPrompt,
        }
        let talkDoc = new talkModel({helper:helperName,text:resObj.text})
        await talkDoc.save({ helper: helperName, text:resObj.text})
    }
    res.json(resObj);
});

app.post("/api/:helper", async (req, res) => {
	let helperName = req.params.helper.toLowerCase()
	let ans = await helpers[helperName].Fragen(req.body.text);
	ans = req.body.text + ans;
	res.setHeader('Content-Type', 'application/json');
    	res.end(JSON.stringify({ text: ans }));

    await talkModel.updateOne({helper:helperName},{$set:{text:ans}})
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Visit on http://localhost:3001/api`);
});
