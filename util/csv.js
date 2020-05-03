const { createWriteStream } = require('fs');
const memoryUsage = require('./memoryUsage');

const csvStream = (fileName) => {
	const stream = createWriteStream(`./stats/${fileName}.csv`, {
		highWaterMark: 1024,
		autoClose: true,
	});
	memoryUsage(stream, 200);
};

module.exports = csvStream;