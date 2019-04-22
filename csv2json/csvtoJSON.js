const csvFilePath = './customer-data.csv';
const fs = require('fs');
const csv = require('csvtojson');
let arr = [];

csv().fromFile(csvFilePath)
	.then((jsonobj)=>{
		console.log(jsonobj);
		arr.push(jsonobj);
	})
	.then((error)=>{
		if(error) {
			return process.exit(1);
		}
		console.log(arr);
		fs.writeFile('./customer-data.json' , JSON.stringify(arr, null ,2), (error)=>{
			if(error) {
				return process.exit(1);
			}
			console.log('done');
			process.exit(0);
		})
})