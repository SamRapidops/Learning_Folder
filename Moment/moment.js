const express = require('express');
const bodyParser = require('body-parser');
const moment = require('moment');
moment().format();

const app = express();

app.use(bodyParser.json());

app.get('/' , (req,res)=>{
	//console.log(moment());
	res.send(moment("12-25-1995", "MM-DD-YYYY"));
})



app.listen(4000 , ()=>{
	console.log('server is running on port 4000');
})