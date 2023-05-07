const mongoose = require('mongoose')
const repl = require('repl')
const talkModel = require("./modules/models")

let c = console.log

mongoose.connect('mongodb+srv://nickelpaulsen:JvSolzprsUVLRaHW@psycho.mqlealx.mongodb.net/?retryWrites=true&w=majority',
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

//Object.assign(repl.start().context, {talkModel:talkModel,mongoose:mongoose})

async function findOne(){
    const talk = await talkModel.findOne({helper:"bjoern"})
    db.close()
    c(talk)
}

async function existsOne(){
    const talk = await talkModel.findOne({helper:"nickel"})
    db.close()
    c(talk)
    talk ? c("yes"):c("no");
}

//db.talks.insertOne( { helper: "bjoern", text:"Ich war immer für dich da und werde es auch immer sein" } );

async function save(){
    //c(talkModel)
    const doc = new talkModel({ helper: "klaus", text:"Ich war immer für dich da und werde es auch immer sein" })
    const talk = await doc.save({ helper: "klaus", text:"Ich war immer für dich da und werde es auch immer sein" })
    db.close()
    c(talk)
}

async function Delete(){
    const talk = await talkModel.findOneAndDelete({helper:"klaus"})
    db.close()
    c(talk)
}

Delete()
