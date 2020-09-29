const { createReadStream } = require('fs');
const path = require('path');
const { Readable, Writable } = require('stream');

const FILE_NAME = path.resolve(__dirname, '../very_large_file.mp4');

/**
 * 
 * @param {Readable} readStream
 * @param {Writable} writeStream
 */
const doSomeIo = async (readStream, writeStream) => {
	const readFileStream = createReadStream(FILE_NAME);
	readFileStream.on('data', (chunk) => {
    writeStream.write(chunk);
  });
  readFileStream.on('end', () => {
    writeStream.end();
  });

  writeStream.setHeader("Content-Type", "video/mp4");
};

module.exports = doSomeIo;