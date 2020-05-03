const { readFileSync } = require("fs");
const ProgressBar = require('../util/progressBar');

const doSomeIo = async (fileName, writeStream) => {

	const progressBar = await ProgressBar.create(fileName);
	const veryLargeFile = readFileSync(fileName);
	progressBar.increment(veryLargeFile.length, { fileName, rate: "Max"});
	writeStream.write(veryLargeFile);
	writeStream.end();
};

module.exports = doSomeIo;
