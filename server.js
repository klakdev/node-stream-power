const { createServer } = require('http');
const memoryUsage = require('./util/csv');

const FILE_PATH = "./very_large_file.mp4";
//const FILE_PATH = "./large_json.json";

const doSomeIo = {
	sync: require("./methods/readFileSync"),
	async: require("./methods/readFileAsyncPromise"),
	stream: require("./methods/stream"),
	control_flow: require("./methods/controlFlow"),
	stream_many: require("./methods/streamMany"),
	multiple: require("./methods/multiple"),
	transform: require("./methods/transform"),
	load_json: require("./methods/loadJson"),
	kinesis: require("./methods/kinesisStyle"),
};

const methodName = process.argv[2];
const method = doSomeIo[methodName];

if(!method) {
	throw new Error("No method selected\npossible methods: sync, async, stream, stream_many, control_flow, stream_many, multiple, transform");
}

memoryUsage(methodName);
createServer((req, res) =>  method(req, res, FILE_PATH))
.listen(8081, () => console.log("Server started - " + methodName));
