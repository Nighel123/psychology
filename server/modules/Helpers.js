let { openai } = require("./OpenAI.js"),
c = console.log;


function BjoernClass(){
	this.name = "Björn";
	this.aiInfo = 'You are my brother who loves me. But you never really had time for me. \n\nMe: "Do you love me?" \nBrother: "Yes I love you! I only always had problems to express my feelings since I never learned how to do that in my childhood!"  '
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
		const completion = await openai.createCompletion({
			  model: "text-davinci-003",
			  max_tokens: 1000,
			  prompt: this.aiInfo + question
 		});
		return completion.data.choices[0].text
	}
}

let bjoern = new BjoernClass, 
    klaus = new KlausClass, 
    rumo = new RumoClass;

exports.helpers = {
	bjoern,
	klaus,
	rumo,
}
