var mongoose = require('mongoose');
var Schema = `mongoose.Schema`;

activitySchema = new mongoose.Schema({
	uid:String, //save users id
	pid : Number,
	postId:String,
	post: String,
	date:String,
	seen: {type:Number, default:0, min:0, max:1},
});


const activity = mongoose.model('Activity', activitySchema);

module.exports = activity;
