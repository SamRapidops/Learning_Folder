const express = require('express');
const router = express.Router();

router.get('/sam' , (req,res)=>{
	res.send({type: 'GET'});
});

router.post('/sam' , (req,res)=>{
	res.send({type: 'POST'});
});

router.put('/sam/:id' , (req,res)=>{
	res.send({type: 'PUT'});
});

router.delete('/sam/:id' , (req,res)=>{
	res.send({type: 'DELETE'});
});

module.exports = router;