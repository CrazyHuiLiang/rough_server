const cluster = require('node:cluster');
const http = require('node:http');
const numCPUs = 1;
const process = require('node:process');
const buff = new Buffer.from([111, 107]);
const fs = require('fs');
const buff2 = fs.readFileSync('/Users/huiliang/Downloads/index.html');
console.log(buff2);


var open = process.binding('fs').open;
var sendfile = process.binding('fs').sendfile;


console.log(process.pid, process.ppid, open, sendfile);

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    http.createServer((req, res) => {
        res.writeHead(200);
        res.end(buff2);
    }).listen(3000);

    console.log(`Worker ${process.pid} started`);
}
