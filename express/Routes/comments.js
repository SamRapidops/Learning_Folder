module.exports = {
	getComment(req,res) {
		res.status(200);
		res.send(req.store.posts[req.params.postId].comments);
	},
	addComment(req,res){
		let newcomment = req.body;
		let commentId = comments.length;
		comments.push(newcomment);
		res.status(201);
		res.send({commentId: commentId})
	},
	updateComment(req,res) {
		req.store.posts[req.params.postId].comments[req.params.commentId] = Object.assign(req.store.posts[req.params.postId].comments[req.params.commentId] , req.body);
		res.status(200);
		res.send(req.store.posts[req.params.postId].comments[req.params.commentId]);
	},
	removeComment(req,res) {
		req.store.posts[req.params.postId].comments.splice(req.params.postId , 1);
		req.status(204).send();
	}
}