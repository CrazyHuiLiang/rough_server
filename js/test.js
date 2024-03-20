const http = require('http');

const buff = new Buffer.from([111, 107]);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.end(buff);
});

server.listen(3000);
