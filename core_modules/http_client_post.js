 const http = require('http');
 const postData = JSON.stringify({ foo: 'bar'});

 const options = {
 	hostname: 'mockbin.com',
 	port: 80,
 	path: '/request?foo=bar&foo=baz',
 	method: 'POST',
 	headers: {
 		'Content-Type': 'application/x-www-form-urlencoded',
 		'Content-Length': Buffer.byteLength(postData)
 	}
 }

 const req = http.request(options , (response)=> {
 	response.on('data' , (chunk)=> {
 		console.log(`BODY: ${chunk}`);
 	})

 	response.on('end' , ()=>{
 		console.log('no more data in response.');
 	})
 })

 req.on('error' , (error)=>{
 	console.log(`problem with request: ${error.message}`);
 })

 req.write(postData);
 req.end();