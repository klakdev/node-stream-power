const cliProgress = require('cli-progress');
const colors = require('colors');
const { promises: { stat }  } = require("fs");


const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
	hideCursor: true,
	format: '{fileName} [' + colors.blue('{bar}') +'] {percentage}% | ETA: {eta}s | {value}/{total} | {rate}'
}, cliProgress.Presets.rect);

const createProgressBar = async (size) => {
	const bar = multibar.create(size, 0);
	bar.start(size, 0);
	return bar;
};

const createFileProgressBar = async (fileName) => {
	const fileStats = await stat(fileName);
	return createProgressBar(fileStats.size);
};

const createInProgress = async (fileName, progress) => {
	const fileStats = await stat(fileName);
	return createProgressBar(fileStats.size - progress);
};



module.exports = {
	create: createFileProgressBar,
	createInProgress,
};