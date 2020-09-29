const path = require('path');
const { readFile } = require("fs");

const FILE_NAME = path.resolve(__dirname, '../very_large_file.mp4');

const doSomeIo = async (readStream, writeStream) => {
  writeStream.setHeader("Content-Type", "video/mp4");

	readFile(FILE_NAME, (err, veryLargeFile) => {
		writeStream.write(veryLargeFile);
		writeStream.end();
	});
};

module.exports = doSomeIo;