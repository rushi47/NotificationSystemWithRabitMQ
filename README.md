# NotificationSystemWithRabitMQ
It is notification system which is built using RabitMQ, Sockets.io, MongoDB, and Bootstrap in front end with Node js.
Requirement:
•	Mongo db on localhost : 27017
•	If not installed can downloaded from – 
•	https://www.mongodb.com/download-center#community
•	RabitMQ but for rabbitmq it require Erlang :
•	Erlang:
•	http://www.erlang.org/downloads
•	RabitMQ:
•	https://www.rabbitmq.com/install-windows.html
•	Node js :
•	https://nodejs.org/en/download/

Step to Start App:
•	Start the Mongo Demon using:
          >  mongod

•	All the necessary packages are includes in zip
>  npm start : start the app
*   (optional step) if nodemon shows the error though its included
•	npm install –g nodemon 

•	Port will be exposed on 5000

 
Scenario: 
	“Jack”) is alone and is completely bored of its daily routine; he wants to try something new. So he search on the internet for the various information after searching lot he gets the website named “NotificationSystem” who does lots of task but also publish article about tech. Jacks read the article and get impressed. He start exploring, he reads everyday, comes daily visit the website reads new article. But jack also wants to know about its peers and also the new published articles as he don’t want to keep scrolling and searching for them every day. And jack feels he is in the same problem like other website but not on NotificationSystem. As jack subscribed to channel when he logged in, gets all the update in the from notification. Now jack is happy and his life is simplified but what happens in backend. 
	When jack subscribers for the channel he is unknowingly registering him as interested user for topic. Our db generates the data at random interval and getting connected to db and pulling all info is overhead and what if many jacks get connected at one. Other part is he also can missout on the information as there can be data loss in between. To remove all these hurdles our db produces data and bind his self with exchange in form of topic.  Now when exchange has the data now data is persistent that means unless and until all the receivers acknowledge for the data, data is stored there. Now when jack open the site he has already subscribed for the topic, once connected jack receives his update from exchange, which is stored in queue with respective topic and get added into his activities db. After clicking the notification he can see all the activities which has happened in his absence as data is coming from activity collection. Once he clicks on the notification icon the data is marked as seen from backend and becomes invisible on the front end to make room for the new.
