const EventEmitter = require('events');

class Job extends EventEmitter {}

job = new Job();

job.on('nudge' , function(time) {
	console.log(`job was done at ${time}`);
})

job.emit('nudge' , new Date());

job.on('knock' , function() {
	console.log('hiiiiiiiiiiiiiii');
})

job.on('knock' , function(){
	console.log('heyyyyyy');
})

job.emit('knock');
job.emit('knock');

class Job1 extends EventEmitter {
	constructor(element) {
		super(element);
		this.on('start' , () => {this.process();})
	}

	process() {
		setTimeout(()=>{
			this.emit('done' , {completedOn: new Date()})
		} , 1000)
	}
}

job1 = new Job1();

job1.on('done' , function(data) {
	console.log(`weekly email job completed at ${data.completedOn}`)
})

job1.emit('start');