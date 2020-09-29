const { createServer } = require('http');
//const memoryUsage = require('./util/csv');


const doSomeIo = {
	sync: require('./methods/readFileSync'),
  async: require('./methods/readFileAsync'),
  //3 ways for consuming data from streams
  data: require('./methods/data'),
  readable: require('./methods/readable'),
  readable_bp: require('./methods/readable-with-no-backpressure'),
  pipe: require('./methods/pipe'),


	stream_many: require('./methods/streamMany'),
	multiple: require('./methods/multiple'),

  //object mode
	load_json: require('./methods/loadJson'),
	transform_json: require('./methods/transform'),
	transform: require('./methods/transform'),

	kinesis: require('./methods/kinesisStyle'),
};

const methodName = process.argv[2];
const method = doSomeIo[methodName];

if(!method) {
  throw new Error(
    `No method selected
    possible methods: sync, async, stream, stream_many, control_flow, stream_many, multiple, transform`
  );
}

//memoryUsage(methodName);
createServer((req, res) => method(req, res))
.listen(8081);
