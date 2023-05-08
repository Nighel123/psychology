const mongoose = require('mongoose')

const { MONGOOSE_CONNECT_LINK } = process.env;

exports.connect = () => {

    mongoose.connect(MONGOOSE_CONNECT_LINK,
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        }
    );
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "Mongoose connection error: "));
    db.once("open", function () {
        console.log("Connected successfully");
    });

};