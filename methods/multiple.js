const { createReadStream } = require("fs");
const ProgressBar = require('../util/progressBar');

let readStream = null;
let progress = 0;
const progressBars = [];

function updateProgressBars(chunkLength, fileName, rate) {
	progressBars.forEach(progressBar => {
		progressBar.increment(chunkLength,  { fileName, rate });
	});

	progress += chunkLength;
}

function getStream(fileName) {
	if (readStream) { return readStream; }

	readStream = createReadStream(fileName);
	readStream.on("data", (chunk) => {
		const rate = readStream.readableHighWaterMark;
		updateProgressBars(chunk.length, fileName, rate);
	});

	return readStream;
}



const doSomeIo = async (fileName, writeStream) => {

	const progressBar = await ProgressBar.createInProgress(fileName, progress);
	progressBars.push(progressBar);

	const readStream = await getStream(fileName);
	readStream.pipe(writeStream);
};

module.exports = doSomeIo;