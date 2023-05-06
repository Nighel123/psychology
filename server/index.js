// server/index.js
const express = require("express");
const helpers = require("./modules/Helpers").helpers
const c = console.log
const path = require('path');

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

//This is for production: https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/amp/
if (process.env.NODE_ENV === 'production') {
    c("Running Node Server in Production Enviroment")
    app.use(express.static(path.resolve(__dirname, '../client/build')));
}

app.get("/api/:helper", (req, res) => {
	let helper = req.params.helper.toLowerCase()
    helper = helpers[helper]
   	res.json({ 
        heading: helper.relation + ": " + helper.name,
        text: helper.chatName + ": " + helper.firstQuest + helper.answerPrompt,
    });
});

app.post("/api/:helper", async (req, res) => {
	let helper = req.params.helper.toLowerCase()
	let ans = await helpers[helper].Fragen(req.body.text);
	ans = req.body.text + ans;
	res.setHeader('Content-Type', 'application/json');
    	res.end(JSON.stringify({ text: ans }));
});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Visit on http://localhost:3001/api`);
});
