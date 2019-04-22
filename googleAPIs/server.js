const http = require('http');
const express = require('express');
const Session = require('express-session');
const {google} = require('googleapis');
const OAuth2 = google.auth.OAuth2;
const ClientId = "652840102010-85qke16p1qqrh7b1v80hnr8fa550n4qq.apps.googleusercontent.com";
const ClientSecret = "8jYGxQm6jfnWSMXKWYfAQ_TP";
const RedirectionUrl = "http://localhost:3333/oauthCallback";

const app = express();

app.use(Session({
	secret: 'hey sam!!!!!',
	resave: true,
	saveUninitialized: true
}))

app.get('/' , (req,res)=>{
	let url = getAuthUrl();
	res.send(`
		<h1>Authentication using google oAuth</h1>
		<a href="${url}">Login</a>
	`)
})

app.get("/oauthCallback", function (req, res) {
	//console.log(req.query.code);
	//console.log(req.url);
    let oauth2Client = getOAuthClient();
    let session = req.session;
    let code = req.query.code; 
    oauth2Client.getToken(code, function(err, tokens) {

      if(!err) {
        oauth2Client.setCredentials(tokens);
        session["tokens"]=tokens;
        res.send(`
            <h3>Login successful!!</h3>
            <a href="/details">Go to details page</a>;
        `);
      }
      else{
        res.send(`
            <h3>Login failed!!</h3>;
        `);
      }
    });
});

app.get("/details", function (req, res) {
    let oauth2Client = getOAuthClient();
    oauth2Client.setCredentials(req.session["tokens"]);

    const peopleService = google.people({
      version: 'v1', 
      auth: oauth2Client
    });

    peopleService.people.connections.list({
        resourceName: 'people/me',
        //resourceName: 'contactGroups',
        personFields: 'emailAddresses,names'
        },(err, d) => {
           if(err)
           {
             console.log(err);
           }
           else
           {
                res.send(JSON.stringify(d.data));
          }
	});

    // let p = new Promise(function (resolve, reject) {
    //     plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
    //         resolve(response || err);
    //     });
    // }).then(function (data) {
    //     res.send(`
    //         <img src=${data.image.url} />;
    //         <h3>Hello ${data.displayName}</h3>;
    //     `);
    // })
});




function getOAuthClient() {
	return new OAuth2(ClientId , ClientSecret , RedirectionUrl);
}

function getAuthUrl() {
	let oauth2Client = getOAuthClient();
	let scopes = ['https://www.googleapis.com/auth/contacts',
				  'https://www.googleapis.com/auth/userinfo.email',
				  'https://www.googleapis.com/auth/userinfo.profile'];
	let url = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: scopes
	})

	return url;
}

app.listen(3333 , ()=> {
	console.log('server is running on port 3333')
})


