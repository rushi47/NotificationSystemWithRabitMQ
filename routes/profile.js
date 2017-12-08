var io = require('../server');
var mongoose = require('mongoose');
var express = require("express");
var amqp = require('amqplib/callback_api');
var router  = express.Router();
var User = require('../models/user');
var Publisher = require('../models/publishers');
var Posts = require('../models/posts');
var Activity = require('../models/activity');
var q = 'posts';

var path = require('path');
//get RabitMQ connection
var connect
amqp.connect('amqp://localhost', function(err, conn)	{ 		
  conn.createChannel(function(err, ch) {
  	if(err){
  		console.log(err);
  	}
    ch.assertQueue(q, {durable: true});
    connect = ch.prefetch(1);
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    
  });
});

//get index page of notification
router.get('/',  function(req, res){
	var uid = req.query.uid;
	User.find({_id:uid},{channel:1, _id:0},  function(err, userData){
		if(err){
			console.log(err);
		}else{	
				uid = String(userData._id);
				// var channel = []                                  //get channel subscribed	
				// for(var key in userData){
				// 	channel = userData[key]["channel"];
				// }
				// // q = String(channel.pop());						//name of exchange from subscribed
		    	connect.consume(q, function(msg) {		  
		     	 posts = msg.content.toString();	
    			// console.log("Consume post from exchange" + posts);
    			var posts = eval('(' +posts+ ')');    			
    			Activity.create({							//add data in activity
    				uid:String(uid), 
    				pid:1, 
    				postId:String(posts._id), 
    				post:String(posts.post),
    				date:new Date().toISOString(),
    			}, function(err, activityData){
    				if(err){
    					console.log("Adding to activity failed");
    					console.log(err);
    				}else{
    					console.log("Added in activity table");    						
    				}
    			});	 
				 	setTimeout(function() {					//acknowdlege message for exchange
	        		console.log(" [x] Done");
	       			 connect.ack(msg);
	      			}, 7000,{noAck: false});
		 		});		    				
				var activityTable = []								//socket connection
				io.on('connection', function(client) {  
			    	console.log('Client connected...');
				    	client.on('join', function(data) {			//send data as client get connected
								console.log(data);
		
								Activity.find({uid:uid, seen:0},function(err, activityUser){
									if(err){
										console.log(err);
										console.log("Unable to get data from Activity table");
									}else{
										activityTable = unique(activityUser);
										posts = JSON.stringify(activityTable);
										// console.log("Message sent from socket : messages" + posts);
								    	client.emit('messages', posts);
									}
								});
						});  
				   	 	client.on('seen', function(rcvData){    //Update msg seen after seen notification
				   	 		var lastPost
				   	 		for(var key in rcvData){
				   	 			lastPost = rcvData[key]["date"];
				   	 		}   
				   	 		// console.log("Data received *****" + rcvData)
				   	 		lastPost = String(lastPost);
				    		Activity.update({uid:uid,"date":{"$lte":lastPost}},     //update data with time 
				    			{$set:{"seen":1}}, 									//less than that
				    			{multi:true},
				    			function(err, seenData){
				    				if(err){
				    					console.log(err);;
				    					console.log("Updating data failed");
				    				}else{
	
				    				}
				    			});	
				    		});
				});		  			
		res.sendFile(path.resolve('./index.html'));
		}		
	});
});	

function unique(data){
var itemsList = [];
var itemsObj = {};
for (var i = 0; i < data.length; i++) {
    var item = data[i];
    if (!itemsObj[item.id]) {
        itemsObj[item.id] = item;
        itemsList.push(item);
    }
	}
return itemsList;	
}



module.exports = router;
