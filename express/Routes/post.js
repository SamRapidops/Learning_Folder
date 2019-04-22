module.exports = {
	getPost(req,res) {
		res.status(200);
		res.send(req.store.posts);
	},
	addPost(req,res){
		let newpost = req.body;
		let postId = req.store.posts.length;
		store.posts.push(newpost);
		res.status(201);
		res.send({postId: postId})
	},
	updatePost(req,res) {
		req.store.posts[req.params.postId] = Object.assign(req.store.posts[req.params.postId] , req.body);
		res.status(200);
		res.send(req.store.posts[req.params.postId]);
	},
	removePost(req,res) {
		req.store.posts.splice(req.params.postId , 1);
		req.status(204).send();
	}
}