// server/index.js

const express = require("express");
const cors = require("cors");
const logger = require('morgan');
const helpers = require("./modules/Helpers").helpers
const c = console.log

const PORT = process.env.PORT || 3001;

//console.log("right here")
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

//This is for production: https://www.freecodecamp.org/news/how-to-create-a-react-app-with-a-node-backend-the-complete-guide/amp/
//const path = require('path');
//app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/:helper", (req, res) => {
	let helper = req.params.helper.toLowerCase()
	switch (helper){
		case 'bjoern':
  			res.json({ message:'Mein Bruder'});
            break;
        case 'klaus':
            res.json({ message:'Mein Vater'});
            break;
        case 'rumo':
            res.json({ message:'Mein Beschützer'});
            break;
        default:
            res.json({ message:'Mein Helfer'});
    }
});

app.post("/:helper",async (req, res) => {
	//console.log(req.body.text);
	let helper = req.params.helper.toLowerCase()
    c(helper)
    c(helpers[helper])
	let ans = await helpers[helper].Fragen(req.body.text);
	ans = req.body.text + ans;
	res.setHeader('Content-Type', 'application/json');
    	res.end(JSON.stringify({ text: ans }));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}. Visit on http://localhost:3001/api`);
});
