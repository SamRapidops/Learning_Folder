const moment = require('moment');
const momentTimezone = require('moment-timezone');


let fileUpdateTime = '2019-03-14 12:30';


let INDIA = moment().format('YYYY-MM-DD HH:mm');
let durationsi = moment(INDIA , 'YYYY-MM-DD HH:mm').diff(moment(fileUpdateTime , 'YYYY-MM-DD HH:mm'), 'days');
console.log("In India file was updated " +durationsi + "days ago");

let USA = moment().tz('America/Phoenix').format('YYYY-MM-DD');
let durationsu = moment(USA , 'YYYY-MM-DD HH:mm').diff(moment(fileUpdateTime , 'YYYY-MM-DD HH:mm'), 'days');
console.log("In USA file was updated " +durationsu + "days ago");