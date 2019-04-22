const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const fs = require('fs');
const http = require('http');

const routes = require('./server.js');

let app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname , 'public')));
app.use(expressValidator());
app.use(expressSession({secret: 'max' , saveUninitialized: false, resav: false}));

app.use('/' , routes);

app.get('/index' , (req,res)=>{
	res.sendFile(path.join(__dirname + '/index.html'))
})

app.use((error,req,res,next)=>{
    res.status(500).send(error);
});

app.listen(4000 , ()=>{
	console.log('server is running on port 4000');
});

