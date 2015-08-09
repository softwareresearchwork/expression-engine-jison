var fs = require("fs");
var Parser = require("jison").Parser;
var dataStructures = require("./data-structures.js");

function parse(path) {
	var bnf = fs.readFileSync(path, "utf8");
	var parser = new Parser(bnf);
	return parser;
}

data = {
	a : 10,
	b : 20
};

var parser = parse("engine.jison");
fs.writeFileSync("engine.parser.js", parser.generate());

for ( var key in dataStructures) {
	if (dataStructures.hasOwnProperty(key)) {
		parser.yy[key] = dataStructures[key];
	}
}

var inputFromFile = fs.readFileSync("input.txt", "utf8");
var parseOutput = parser.parse(inputFromFile);

parseOutput.evaluate(data);

console.log(JSON.stringify(data, null, "\t"));