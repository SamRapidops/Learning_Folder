    let bodyParser = require('body-parser');
    let express = require('express');
    let app = express();



    /*app.get('/search' , (req,res)=>{
    	db.find(
    		{term: req.query.term} , 
    		{page: req.query.page , limit: 10},
    		(error , results)=> {
    			res.send(results);
    		})
    })*/

 /*   //input validation.............
    app.post('/login', (req, res) => {
	  if (!req.body.email || !req.body.password)
	    return res.send({
	      error: 'Please enter your email and password.'
	    })
	  if (!validateEmail(req.body.email) || ! validatePassword(req.body.password))
	    return res.send({
	      error: 'Invalid format for email and/or password.'
	    })
	  login(req.body.email, req.body.password)
	})*/


    //middleware.............
    app.use(bodyParser.json());

    app.use((req , res , next)=> {
    	console.log(`${req.method} : ${req.url}`);
    	next();
    })

   	app.use((req , res , next)=> {
    	if(req.query.api_key) {
    		next();
    	}else {
    		res.status(401).send({msg: 'not authorized'})
    	}
    })

    app.use((error,req,res,next)=>{
    	res.status(500).send(error);
    })

    //app.use(bodyParser.urlencoded({extended: false}));
    //...................

    app.get('/', (req, res) => {
     res.send('hello world');
    });


    app.get('/accounts', (req ,res , next)=>{
    	console.log('accounts inline');
    	next(new Error('oopps'));
    } ,(req, res) => {
     res.send('account........');
    });

    app.get('/transactions',(req, res) => {
     console.log(req.body);
     res.send('trasaction......');
    });

    

    app.listen(7000, function () {
     console.log('Example app listening on port 7000');
    });