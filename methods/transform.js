const { createReadStream } = require("fs");
const Parser = require("stream-json/Parser");
const { streamArray } = require('stream-json/streamers/StreamArray');
const { stringify  } = require('JSONStream');
const { Transform } = require("stream");
const path = require("path");

const FILE_NAME = path.resolve(__dirname, '../large_json.json');

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

const doSomeIo = async (readStream, writeStream) => {

	const readFileStream = createReadStream(FILE_NAME, {
    highWaterMark: 1024,
  });
	readFileStream
		.pipe(new Parser())
		.pipe(streamArray())
		.pipe(new TransferObjects())
		.pipe(stringify())
		.pipe(writeStream);
};

module.exports = doSomeIo;
