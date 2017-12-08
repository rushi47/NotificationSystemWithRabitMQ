var mongoose = require('mongoose');


var userSchema = new mongoose.Schema({
	username: String,
	channel:[String],
});


module.exports = mongoose.model('User', userSchema);
