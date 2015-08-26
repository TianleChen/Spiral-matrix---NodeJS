var server = require("./hw1-server");
var router = require("./hw1-router");
var requestHandlers = require("./hw1-nonblocking");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;

server.start(router.route, handle);