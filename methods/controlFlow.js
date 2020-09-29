const { createReadStream } = require("fs");
const ProgressBar = require('../util/progressBar');

let totalStreams = 0;
const totalMemory = 0.03 * 1024 * 1024;//10 MB
const maxMemory = 0.01 * 1024 * 1024 ;//1MB

const getHighWaterMark = () => {
	return Math.floor(Math.min(maxMemory, totalMemory / totalStreams));
};

/**
 * 
 * @param {ReadableStream} _readStream 
 * @param {WritableStream} writeStream 
 * @param {string} fileName 
 */
const doSomeIo = async (_readStream, writeStream, fileName) => {
	const progressBar = await ProgressBar.create(fileName);
	totalStreams++;

	const readStream = createReadStream(fileName, {
		highWaterMark: getHighWaterMark(),
	});

	readStream.on("data", (chunk) => {
		readStream._readableState.highWaterMark = 100; //getHighWaterMark();

		const rate = readStream.readableHighWaterMark;
		progressBar.increment(chunk.length, { fileName,  rate });
  });
  const pipe = readStream.pipe;
  readStream.pipe = function(...args) { 
    console.log(this);
    pipe.apply(readStream, args);
  }
	readStream.pipe(writeStream);

	writeStream.on("finish", () =>{ 
		totalStreams--;
	});
};

module.exports = doSomeIo;