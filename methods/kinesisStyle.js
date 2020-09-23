const { Writable, Transform } = require('stream');


class KinesisStyleStream extends Transform {
  constructor(opt) {
    const _opt = {
      ...opt,
      objectMode: true,
    }
    super(_opt);
  }

  _transform(chunk, encoding, callback) {
    console.log(chunk);
  }

  write(obj) {
    console.log(obj);
    this.push(obj);
  }
}

const kinesisStream = new KinesisStyleStream()


// function doSomeIo(readStream, writeStream) {
//   const data = [];
//   readStream.on("data", (chunk) => {
//     data.push(chunk);
//   });
//   readStream.on("end", () => {
//     const obj = JSON.parse(Buffer.concat(data));
//     kinesisStream.write(obj);
//     writeStream.end();
//   })
// }

function doSomeIo(readStream, writeStream) {
  readStream.pipe(kinesisStream);
  readStream.on("end", () => writeStream.end());
}

module.exports = doSomeIo;
