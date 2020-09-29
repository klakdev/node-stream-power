const http = require("http");

http.get("http://localhost:8081", (res) => {
  setInterval(() => {
    const ret = res.read(64);
    console.log("buffer size", ret && ret.length, res.readableLength);
  }, 1000)
});