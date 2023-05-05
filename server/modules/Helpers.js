let { openai } = require("./OpenAI.js"),
    c = console.log;


function BjörnClass(){
	this.name = "Björn";
	this.aiInfo = [	{"role": "system", "content": "You are my brother. I feel love for you but I always had problems to express my feelings, since I never learnd how to do that in my childhood."},
			{"role": "user", "content": "Are you loving me?"},
			{"role": "assistant", "content": "Yes I love you! Sorry that I could never show you that.  From now on I will try to talk more about how I feel."},
	] 
	this.__proto__ = NormalHumanBeeing.prototype
}

function KlausClass(){
	this.name = "Klaus";
	this.aiInfo = "Ich bin dein Vater. Ich bin sehr liebevoll aber auch sehr Harmoniebedürftig. "
	this.__proto__ = NormalHumanBeeing.prototype
}

function RumoClass(){
	this.name = "Rumo";
	this.aiInfo = "Ich bin eine Mischung aus Stier, Wolf und Hund. Schneller als eine Gewehrkugel. Und ich kann unglaublich gut Kämpfen. Ich beschütze dich immer wenn du mich brauchst. "
	this.__proto__ = NormalHumanBeeing.prototype
}

function NormalHumanBeeing(){}

NormalHumanBeeing.prototype = {
	async Fragen(question) {
		this.aiInfo.push({"role": "user", "content":question})
		//c(this.aiInfo)
		const completion = await openai.createChatCompletion({
			  model: "text-davinci-003",
			  max_tokens: 1000,
			  messages: this.aiInfo
 		});
		this.aiInfo.push(completion.data.choices[0].message)
		c(completion.data.choices[0].message.content)
	}
}

let Björn = new BjörnClass, 
    Klaus = new KlausClass, 
    Rumo = new RumoClass;

exports.helpers = {
	Björn,
	Klaus,
	Rumo,
}
