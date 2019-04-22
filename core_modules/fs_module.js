const fs = require('fs');
const path = require('path');

fs.readFile(path.join('temp.txt') , {encoding: 'utf-8'} , function (error , data) {
	if(error) {return console.error(error)}
		console.log(data);
})

fs.writeFile('temp.txt' , 'hey sam' , function (error , data) {
	if(error) {return console.error(error)}
		console.log('writting done.........');
})