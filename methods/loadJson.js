const { readFile } = require("fs");
const path = require("path");

const FILE_NAME = path.resolve(__dirname, '../large_json.json');

const doSomeIo = async (readStream, writeStream) => {
	readFile(FILE_NAME, (err, file) => {
		const json = JSON.parse(file);
		const response = json
			.filter(({age}) => age > 30)
			.map(({_id, age, email, phone}) => ({id: _id, age, email, phone}));
		writeStream.write(JSON.stringify(response));
		writeStream.end();
	});
};

module.exports = doSomeIo;