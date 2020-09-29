const { createConnection } = require('net');

const socket = createConnection(8082);
socket.on("data", (data) => {
  console.log(data.toString());
});