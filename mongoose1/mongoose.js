const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/edx_course_db');

const bookSchema = mongoose.Schema({name: String});

bookSchema.method({
	buy(quantity , customer, callback) {
		let bookToPurchase = this;
		console.log('buy');
		return callback();
	},

	refund(customer , callback) {
		console.log('refund');
		return callback();
	}
})

bookSchema.static({
	getZeroInventoryReport(callback) {
	  //run a query on all books and get the ones with zero inventory
	  console.log('getZeroInventoryReport');
	  let books = [];
	  return callback(books);
	},

	getCountOfBooksById(bookId, callback){
	  //run a query and get the number of books left for a given book
	  console.log('getCountOfBooksById');
	  let count=0;
	  return callback(count);
	}
})

let Book = mongoose.model('book' , bookSchema);
Book.getZeroInventoryReport(()=>{});
Book.getCountOfBooksById(123 , ()=>{})

let practicalNodeBook = new Book({name: 'practical Node.js'});
practicalNodeBook.buy(1,2, ()=>{});
practicalNodeBook.refund(1, ()=>{});

bookSchema.post('save' , (next)=>{
	console.log('post save');
	return next();
})

bookSchema.pre('remove' , (next)=>{
	console.log('pre remove');
	return next(); 
})

practicalNodeBook.save((error,results)=> {
	if(error){
		console.error(error);
		process.exit(1);
	}else {
		console.log('Saved : ' , results);
		practicalNodeBook.remove((error , results)=>{
			if(error) {
				console.error(error);
				proce.exit(1);
			} else {
				process.exit()
			}
		})
	}
})