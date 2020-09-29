const cliProgress = require('cli-progress');
const colors = require('colors');
const { promises: { stat }  } = require("fs");

const MB = 1024 * 1024;
const TOTAL_MEMORY = 250 * MB;

const singleBar = new cliProgress.SingleBar({
  clearOnComplete: false,
  hideCursor: true,
  format: 'Memory Usage: [' + colors.blue('{bar}') +'] {rss}/{total} {percentage}% | Max Memory: {max}'
}, cliProgress.Presets.shades_classic);
singleBar.start(TOTAL_MEMORY / MB, 0)

const fields = ["time (ms), rss (MB)", "arrayBuffers", "external", "heapTotal", "heapUsed"];
const byteToMB = (bytes) => (bytes || 0) / (1000 * 1000);
const relativeTime = (startTime) => Date.now() - startTime;


let MAX_MEMORY = 0;
const sampleMemory = (writeStream, startTime) => {
  const { arrayBuffers, external, heapTotal, heapUsed, rss } = process.memoryUsage();
  if(rss > MAX_MEMORY) MAX_MEMORY = rss;
  singleBar.update(rss / MB, {rss: Number(rss / MB).toFixed(2), total: Number(TOTAL_MEMORY / MB).toFixed(2), percentage: rss / TOTAL_MEMORY, max: Number(MAX_MEMORY / MB).toFixed(2) });
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


