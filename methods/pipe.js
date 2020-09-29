const { createReadStream } = require('fs');
const path = require('path');
const FILE_NAME = path.resolve(__dirname, '../very_large_file.mp4');


const doSomeIo = async (readStream, writeStream) => {
  writeStream.setHeader("Content-Type", "video/mp4");
	const readFileStream = createReadStream(FILE_NAME, { highWaterMark: 1024 });
  readFileStream.pipe(writeStream);
};

module.exports = doSomeIo;