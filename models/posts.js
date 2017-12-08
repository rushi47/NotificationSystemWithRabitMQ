var amqp = require('amqplib/callback_api');
var casual = require('casual');
var mongoose = require('mongoose');
var connect
var q = 'posts';   

amqp.connect('amqp://localhost', function(err, conn) {
	if(err){
		console.log(err);
	}
  conn.createChannel(function(err, ch) {
  	if(err){
  		console.log("Error creating channel");
  		console.log(err);
  	}
    connect = ch.assertQueue(q, {durable: true});
	});
});

postsSchema = new mongoose.Schema({
	pid:Number, //reffer publishers
	post : String,
});
// 


const post = mongoose.model('Post', postsSchema);

module.exports = post;



setInterval(function(){
	var Post  = casual.name + " published post |  channel published";
	post.create({post:Post,pid: 1, 
		}, 
		function(err, data){
			if(err){
				console.log("Publishing data failed");
			}else{
				console.log("Data Published, from producer");
				data = JSON.stringify(data);
   				connect.sendToQueue(q, new Buffer(data), {persistent: true});
				console.log(data);
			}
	});			
}, 2000);



