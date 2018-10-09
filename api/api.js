const express = require('express')
const app = express();
const port = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
  	host: 'localhost',
  	user: 'root',
  	password: 'trianglepizza',
  	database: 'forum'
});

connection.connect();

const getAll = (type, callback) => {
	connection.query('select * from ' + type, (error, results, fields) => {
	  	if (error) throw error;
	  	callback(results);
	});
}

const storeMessage = (topicId, content, callback) => {
	const query = 'INSERT INTO message (topics_id, content) VALUES (' + topicId + ', \"' + content + '\"' + ');';
	connection.query(query, (error, results, fields) => {
	  	if (error) throw error;
	  	callback();
	});
} 

const storeTopic = (name, callback) => {
	const query = 'INSERT INTO topic (name) VALUES (\"' + name + '\");';
	connection.query(query, (error, results, fields) => {
	  	if (error) throw error;
	  	callback();
	});
} 

const getTopicById = (id, callback) => {
	const query = 'SELECT * FROM topic INNER JOIN message ON topic.id = message.topics_id WHERE topic.id = ' + id;
	connection.query(query, (error, results, fields) => {
	  	if (error) throw error;
	  	callback(results);
	});
}	

app.use(cors()); 
app.use(bodyParser.json());

app.get('/message', (request, response) => {
	getAll('message', (items) => {
		response.send(items);
	});
});

app.get('/topic', (request, response) => {
	getAll('topic', (items) => {
		response.send(items);
	});
});

app.get('/topic/:id', (request, response) => {
	getTopicById(request.params.id, (results) => {
		response.send(results);
	});
});

app.post('/message/:topicId', (request, response) => {
	storeMessage(request.params.topicId, request.body.message, () => {
		response.send();
	});
});

app.post('/topic', (request, response) => {
	console.log(request.body);
	storeTopic(request.body.name, () => {
		response.send();
	});
});

app.listen(port, () => console.log('listening to port ' + port));