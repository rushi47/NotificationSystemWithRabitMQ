var app = require('express')();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./models/user');
var Publisher = require('./models/publishers');
var Posts = require('./models/posts');
var Activity = require('./models/activity');
var amqp = require('amqplib/callback_api');
var http = require('http').Server(app);
var io = require('socket.io')(http);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/NotificationSystem");
app.use(bodyParser.urlencoded({extended: true}));
var port = 5000;
module.exports = io;


//Router

var userRoutes = require("./routes/user");
var profileRoutes = require("./routes/profile");

app.get("/", function(req, res){
	res.sendFile('./views/landing.html', { root: __dirname });
});

app.use("/user", userRoutes);


app.use("/profile", profileRoutes);




http.listen(port, function(){
	console.log("Listening on port " + port);
});