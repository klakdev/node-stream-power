const { createReadStream } = require("fs");
const ProgressBar = require('../util/progressBar');

let totalStreams = 0;
const totalMemory = 10 * 1024 * 1024;//10 MB
const maxMemory = 1 * 1024 * 1024 ;//1MB

const getHighWaterMark = () => {
	return Math.floor(Math.min(maxMemory, totalMemory / totalStreams));
};

const doSomeIo = async (fileName, writeStream) => {
	const progressBar = await ProgressBar.create(fileName);
	totalStreams++;

	const readStream = createReadStream(fileName, {
		highWaterMark: getHighWaterMark(),
	});

	readStream.on("data", (chunk) => {
		readStream.highWaterMark = getHighWaterMark();

		const rate = readStream.readableHighWaterMark;
		progressBar.increment(chunk.length, { fileName,  rate});

	});
	readStream.pipe(writeStream);

	writeStream.on("finish", () =>{ 
		totalStreams--;
	});
};

module.exports = doSomeIo;