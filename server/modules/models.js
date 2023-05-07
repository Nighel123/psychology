const mongoose = require("mongoose");

const TalkSchema = new mongoose.Schema({
  helper: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "",
  },
});

const Talk = mongoose.model("Talk", TalkSchema);

module.exports = Talk;
