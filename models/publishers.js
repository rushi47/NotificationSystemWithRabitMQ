var mongoose = require('mongoose');

var publishersSchema = new mongoose.Schema({
	_id:Number,
	name:String,
});


var publishers = mongoose.model('Publisher', publishersSchema);
module.exports = publishers;