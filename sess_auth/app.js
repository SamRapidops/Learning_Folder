const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const  bodyParser = require('body-parser');


const TWO_HOURS = 1000*60*60*2;
const {
	PORT = 5000,
	NODE_ENV = 'development',
	SESS_NAME = 'sid',
	SESS_LIFETIME = TWO_HOURS,
	SESS_SECRET = 'Quite it!!!' 
} = process.env

const app = express();

const IN_PROD = NODE_ENV === 'production';

app.use(express.static(path.join(__dirname , 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))

const users = [
	{ id: 1 , name: 'sam' , email: 'sam@gmail.com' , password: 'toper'},
	{ id: 2 , name: 'ritesh' , email: 'ritesh@gmail.com' , password: 'toper'},
	{ id: 3 , name: 'prashant' , email: 'prashant@gmail.com' , password: 'toper'},
	{ id: 4 , name: 'joy' , email: 'joy@gmail.com' , password: 'toper'}
]

app.use(session({
	name: SESS_NAME,
	resave: false,
	saveUninitialized: false,
	secret: SESS_SECRET,
	cookie: {
		maxAge: SESS_LIFETIME,
		sameSite: true,
		secure: IN_PROD
	}
}))

const redirectLogin = (req,res,next)=> {
	if(!req.session.userId) {
		res.redirect('/login')
	}else{
		next()
	}
}

const redirectHome = (req,res,next)=> {
	if(req.session.userId) {
		res.redirect('/home')
	}else{
		next()
	}
}

app.use((req , res, next) => {
	const { userId } = req.session
	if(userId) {
		res.locals.user = users.find(user => user.id === userId)
	}
	next();
})

app.get('/' , (req,res)=>{
	const { userId } = req.session;

	res.send(`
			<h1>Welcome!</h1>
			${userId ? `
				<a href='/home'>Home</a>
				<form method='post' action='/logout'>
					<button> Logout</button>
				</form>
			` : `
				<a href='/login'>Login</a>
				<a href='/register'> Register</a>
			`}
			
		`)
})

// app.get('/' , (req,res)=>{
// 	console.log(req.session);

// 	res.sendFile(path.join(__dirname + '/index.html'))
// })

app.get('/home' , redirectLogin , (req,res)=>{
	const { user } = res.locals 
	console.log(req.session);
	res.send(`
		<h1>Home</h1>
		<a href='/'>Main</a>
		<ul>
			<li>Name: ${user.name}</li>
			<li>Email: ${user.email}</li>
		</ul>
	`)
})

app.get('/profile' , redirectLogin, (req,res)=> {
	const { user } = res.locals
})

app.get('/login' , redirectHome , (req,res)=>{
	res.send(`
		<h1> Login</h1>
		<form method='post' action='/login'>
			<input type='email' name='email' placeholder='Email' required />
			<input type='password' name='password' placeholder='Password' required />
			<input type='submit' />
		</form>
		<a href='/register'> Register</a>
	`)
	
})

app.get('/register' , redirectHome , (req,res)=>{
	res.send(`
		<h1> Register</h1>
		<form method='post' action='/register'>
			<input type='text' name='name' placeholder='Name' required />
			<input type='email' name='email' placeholder='Email' required />
			<input type='password' name='password' placeholder='Password' required />
			<input type='submit' />
		</form>
		<a href='login'> Login</a>
	`)
})

app.post('/login' , redirectHome , (req,res)=>{
	const { email , password } = req.body;

	if(email && password) {
		const user = users.find( user => user.email === email && user.password === password)
		if(user) {
			req.session.userId = user.id;
			return res.redirect('/home');
		}
	}
	res.redirect('/login');

})

app.post('/register' , redirectHome , (req,res)=>{
	const { name , email , password } = req.body;

	if(name && email && password) {
		const exists = users.some( user => user.email === email)
		if(!exists) {
			const user = {
				id: users.length + 1,
				name,
				email,
				password
			}

			users.push(user);

			req.session.userId = user.id;
			return res.redirect('/home');
		}
	}
	res.redirect('/register');
})

app.post('/logout' , redirectLogin , (req,res)=>{
	req.session.destroy(err => { 
		if(err) {
			return res.redirect('/home')
		}

		res.clearCookie(SESS_NAME);
		res.redirect('/login');
	})
})


app.listen(5000, ()=>{
	console.log('server is ruuning on port 5000');
})