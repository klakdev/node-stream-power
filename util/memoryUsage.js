
const fields = ["time (ms), rss (MB)", "arrayBuffers", "external", "heapTotal", "heapUsed"];
const byteToMB = (bytes) => (bytes || 0) / (1000 * 1000);
const relativeTime = (startTime) => Date.now() - startTime;


const sampleMemory = (writeStream, startTime) => {
	const { arrayBuffers, external, heapTotal, heapUsed, rss } = process.memoryUsage();
	writeStream.write(`${relativeTime(startTime)}, ${byteToMB(rss)}, ${byteToMB(arrayBuffers)}, ${byteToMB(external)}, ${byteToMB(heapTotal)}, ${byteToMB(heapUsed)}\n`);
};


/**
 * 
 * @param {writeStream} writeStream 
 */
const memoryUsage = (writeStream, interval) => {
	writeStream.write(`${fields.join(",")}\n`);
	const startTime = Date.now();
	setInterval(sampleMemory.bind(null, writeStream, startTime), interval);
};

module.exports = memoryUsage;


