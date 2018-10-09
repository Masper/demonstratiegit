function getTopics(callback) {
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
    	if (this.readyState == 4 && this.status == 200) {
    		callback(JSON.parse(xhttp.responseText));
    	}
	};
	xhttp.open('GET', 'http://localhost:3000/topic', true);
	xhttp.send();
}

function addTopic() {
	var name = document.getElementById('input').value;
	if (name.length>100) {
		console.log("error, input too long")
	}
	else {
		var body = { name: name };
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
    		if (this.readyState == 4 && this.status == 200) {
    			location.reload();
    		}
		};
		xhttp.open('POST', 'http://localhost:3000/topic', true);
		xhttp.setRequestHeader('Content-Type', 'application/json');
		xhttp.send(JSON.stringify(body));
	}
}

function initTopics() {
	window.onload = function () {
		document.getElementById("button").addEventListener('click', addTopic)
	}
	localStorage.removeItem('_topicname');
	getTopics(function(topics) {
		for (var counter = 0; counter < topics.length; counter++) {
			appendTopic(topics[counter]);
		}
	});
}

function appendTopic(topic) {
	var list = document.getElementsByTagName('ul')[0];
	var item = document.createElement('li');
	var div = document.createElement('div');
	var text = document.createTextNode(topic.name);
	var getDate = (topic.topic_time.slice(0,9));
	var time = (topic.topic_time.slice(11,18));
	var date = document.createTextNode(" "+ "created at: " + getDate)
	item.addEventListener('click', function() {
		onTopicClick(topic);
	});
	item.appendChild(text);
	div.appendChild(date);
	item.appendChild(div);
	list.appendChild(item);
}

function onTopicClick(topic) {
	localStorage.setItem('_topicname', topic.name);
	location.href = 'topic.html?id=' + topic.id;
}

initTopics();