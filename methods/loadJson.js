const { readFile } = require("fs");


const doSomeIo = async (fileName, writeStream) => {
	readFile(fileName, (err, file) => {
		const json = JSON.parse(file);
		const response = json
			.filter(({age}) => age > 30)
			.map(({_id, age, email, phone}) => ({id: _id, age, email, phone}));
		writeStream.write(JSON.stringify(response));
		writeStream.end();
	});
};

module.exports = doSomeIo;