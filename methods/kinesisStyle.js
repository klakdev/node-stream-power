const { Transform } = require('stream');
const { createServer } = require("net")


class KinesisStyleStream extends Transform {
  constructor(opt) {
    super({
      ...opt,
      defaultEncoding: "utf8",
      readableObjectMode: true,
    });
  }

  _transform(chunk, encoding, cb) {
    try {
      const obj = JSON.parse(chunk);
      if ("object" === typeof obj) {
        this.push(JSON.stringify(obj));
        this.push(",");
      }
    }
    catch(e) { /*do nothing*/ }
    cb()
  }

  _final() {
    this.push("]");
  }
}

const kinesisStream = new KinesisStyleStream()

function doSomeIo(readStream, writeStream) {
  readStream.pipe(kinesisStream, { end: false });
  readStream.on("end", () => writeStream.end());
}

createServer((socket) => {
  socket.write("[")
  kinesisStream.pipe(socket);
}).listen(8082);


 
module.exports = doSomeIo;
