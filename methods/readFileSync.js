const { readFileSync } = require("fs");
const path = require('path');

const FILE_NAME = path.resolve(__dirname, '../very_large_file.mp4');

const doSomeIo = async (readStream, writeStream) => {
  writeStream.setHeader("Content-Type", "video/mp4");
	const file = readFileSync(FILE_NAME);
	writeStream.write(file);
	writeStream.end();
};

module.exports = doSomeIo;
