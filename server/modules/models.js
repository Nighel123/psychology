const mongoose = require("mongoose");

const TalkSchema = new mongoose.Schema({
  helper: { type: String, required: true },
  text: { type: String, default: "" },
});

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String },
});

const talkModel = mongoose.model("Talk", TalkSchema);
const User = mongoose.model("user",userSchema);

module.exports = {
  talkModel,
  User
}
