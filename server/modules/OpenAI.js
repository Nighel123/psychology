const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const readline = require('readline');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
exports.openai = openai;
