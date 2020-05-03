const { promises: { readFile } } = require("fs");

const doSomeIo = async (fileName, writeStream) => {
	const veryLargeFile = await readFile(fileName);
	writeStream.write(veryLargeFile);
	writeStream.end();
};

module.exports = doSomeIo;