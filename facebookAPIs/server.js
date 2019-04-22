const http = require('http');
const express = require('express');
const Session = require('express-session');

const passport = require('passport'),
 FacebookStrategy = require('passport-facebook').Strategy

const app = express();

passport.use('facebook' ,new FacebookStrategy({
	clientID : "337585160213063",
	clientSecret : "bb420b361df43d8c0e56d4c5bf5dc5fb",
	callbackURL : "http://localhost:5555/auth/facebook/callback",
	profileFields : ['id' , 'email' ,'displayName' , 'photos','name' , 'gender' , 'profileUrl']
},
	 (accessToken, refreshToken , profile , done) => {
	 	console.log(profile);
	 	done(null , profile);
	 }

));

app.use(passport.initialize());
app.use(passport.session());



app.get('/' , (req,res)=>{
	res.send(`
		<h1> Authentication using facebook-passport</h1>
		<a href="/auth/facebook">Login with Facebook</a>
	`)
})

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback' , passport.authenticate('facebook' , { successRedirect : '/success' ,
																		 failureRedirect : '/'	}));

// app.get('/auth/facebook' , 
// 	passport.authenticate('facebook' , { scope : ['read_stream','publish_action','user_birthday','email', 'user_gender']})
// 	);

app.get('/success',(req,res)=>{
	res.send('Success');
});
 
app.listen(5555 , ()=> {
	console.log('server is running on port 5555')
})

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});