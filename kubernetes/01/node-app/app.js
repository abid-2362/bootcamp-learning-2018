const http = require('http');
const os = require('os');
console.log('Kubia server starting...');
var handler = function (req, res) {
  console.log("Received request from " + req.connection.remoteAddress);
  res.writeHead(200);
  res.end("This is v1 running in pod " + os.hostname() + "\n");
}
const server = http.createServer(handler);
const port = 8080;
server.listen(port, function () {
  console.log('server has started on port ' + port);
});