const http = require('http');
const port = 5000;
http.createServer((req , res) => {
	res.writeHead(200, {'content-Type' : 'text/plain'});
	res.end('Finish..........\n');
}).listen(port);

console.log(`server running at http://localhost:${port}/`);