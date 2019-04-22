// const EventEmitter = require('events');

// const emitter  = new EventEmitter();

// emitter.on('hey' , () => {console.log('hey you...........' , this);});

// emitter.emit('hey');



// 2nd task of event

let EventEmitter = require('events').EventEmitter;

let util = require('util');

function SampleEmitter() {
	EventEmitter.call(this);
}

util.inherits(SampleEmitter, EventEmitter);

let me = new SampleEmitter();

SampleEmitter.prototype.doCall = function doCall() {
	console.log('before');
	me.emit('fire');
	console.log('after');
};

me.on('fire' , () => {console.log('emit fired');});

me.doCall();

let fs = require('fs');
fs.readFile('package.json' , function(err , data) {
	if(err) {
		console.log(err.stack);return;
	}
	console.log(data.toString());
});

console.log('program ended');