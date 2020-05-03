const { createReadStream } = require("fs");
const Parser = require("stream-json/Parser");
const { streamArray } = require('stream-json/streamers/StreamArray');
const { stringify } = require('JSONStream');
const { Transform } = require("stream");

class TransferObjects extends Transform {
	constructor() {
		super({
			objectMode: true,
	
		});
	}

	_transform(chunk, encoding, callback) {
		if (chunk.value.age > 30) {
			const {_id, age, email, phone} = chunk.value;
			this.push({id: _id, age, email, phone});
		}
		callback();
	}
}

const doSomeIo = async (fileName, writeStream) => {

	const readStream = createReadStream(fileName);
	readStream
		.pipe(new Parser())
		.pipe(streamArray())
		.pipe(new TransferObjects())
		.pipe(stringify())
		.pipe(writeStream);
};

module.exports = doSomeIo;
