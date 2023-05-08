// server/index.js
const express = require("express");
const path = require('path'); 

const helpers = require("./modules/Helpers").helpers
const talkModel = require("./modules/models")
require("./modules/Database").connect() 

require('dotenv').config()
const { NODE_ENV } = process.env;

const app = express();

const c = console.log

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


app.post("/login",(req,res) => {
    res.send({
        token:'test123'
    });
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
  const helper = helpers[helperName]
	let ans = await helper.Fragen(req.body.text);
	ans = req.body.text + ans + helper.answerPrompt;
	res.setHeader('Content-Type', 'application/json');
    	res.end(JSON.stringify({ text: ans }));

    await talkModel.updateOne({helper:helperName},{$set:{text:ans}})
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

module.exports = app;

