var express = require("express");
var router  = express.Router();
var User = require('../models/user');



router.get('/', function(req, res){
	var path = require('path');
	res.sendFile(path.resolve('./views/users.html'));
});

router.post("/", function(req, res){
	var username = req.body.username;
	var channel = req.body.channel;
	
	User.create({username:username,channel:channel}, function(err, data){
		if(err){
			console.log(err);

		}else{

			res.redirect('/profile/?uid='+data._id);
			console.log("User created");		
		}
	});
});


module.exports = router;