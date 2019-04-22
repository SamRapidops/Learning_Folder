const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const url = 'mongodb://localhost:27017/edx-course-db'
MongoClient.connect(url , (error , db)=>{
	if(error) return process.exit(1);
	console.log("connected to server.....");
	insertDocuments(db, () => {
    	updateDocument(db, () => {
	      removeDocument(db, () => {
	        findDocuments(db, () => {
	          db.close()
	        })
	      })
	    })
  	})
})

const insertDocuments = (db, callback) => {
  const collection = db.collection('students');
  collection.insert([
    {name : 'Bob'}, {name : 'John'}, {name : 'Peter'} 
  ], (error, result) => {
    if (error) return process.exit(1)
    console.log(result.result.n); 
    console.log(result.ops.length);
    console.log('Inserted 3 documents into the students collection')
    callback(result);
  })
}

const updateDocument = (db, callback) => {
  var collection = db.collection('students');
  const name = 'Peter';
  collection.update({ name : name }, { $set: { grade : 'A' } }, (error, result) => {
      if (error) return process.exit(1)
      console.log(result.result.n); 
      console.log(`Updated the student document where name = ${name}`);
      callback(result);
  })
}

const removeDocument = (db, callback) => {
  const collection = db.collection('students');
  const name = 'Bob';
  collection.remove({ name : name }, (error, result) => {
    if (error) return process.exit(1)
    console.log(result.result.n);
    console.log(`Removed the document where name = ${name}`);
    callback(result);
  })
}

var findDocuments = (db, callback) => {
  var collection = db.collection('students');
  collection.find({}).toArray((error, docs) => {
    if (error) return process.exit(1);
    console.log(2, docs.length);
    console.log(`Found the following documents:`);
    console.dir(docs);
    callback(docs);
  })
}

