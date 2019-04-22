const express = require('express');
const app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());



let profile = [{
	username : 'azat',
	email : '[reducted]',
	url : 'http://azat.com'
}]

app.get('/profile' , (req,res)=>{
	if(req.query.id) return res.send(profile[req.query.id]);
	res.send(profile);
})

app.post('/profile' , (req,res)=>{
	profile.push(req.body);
	console.log('created',profile);
	res.status(201);
	res.send(profile);
})

app.put('/profile/:id' , (req,res)=>{
	Object.assign(profile[req.params.id] , req.body);
	console.log('updated',profile[req.params.id]);
	res.status(204);
	res.send(profile);
})

app.delete('/profile/:id' , (req,res)=>{
	profile.splice(req.params.id,1);
	console.log('deleted',profile);
	res.sendStatus(204);
})

app.listen(3000 , ()=> {
	console.log('server starting at port 3000');
});