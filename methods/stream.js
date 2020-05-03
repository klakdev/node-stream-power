const { createReadStream } = require("fs");
const ProgressBar = require('../util/progressBar');

const doSomeIo = async (fileName, writeStream) => {
	const progressBar = await ProgressBar.create(fileName);

	const readStream = createReadStream(fileName);
	readStream.on("data", (chunk) => {
		const rate = readStream.readableHighWaterMark;
		progressBar.increment(chunk.length,  { fileName, rate });
	});
	readStream.pipe(writeStream);
};

module.exports = doSomeIo;