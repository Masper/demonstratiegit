DROP DATABASE forum;
CREATE DATABASE forum;
USE forum;

create table topic(
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(100) NOT NULL,
   topic_time TIMESTAMP DEFAULT NOW(),
   PRIMARY KEY (id)
);

create table message(
   id INT NOT NULL AUTO_INCREMENT,
   topics_id INT NOT NULL,
   message_time TIMESTAMP DEFAULT NOW(),
   content VARCHAR(100) NOT NULL,
   PRIMARY KEY (id)
);

INSERT INTO topic(name) VALUES ('Eerste test-topic op deze server!');
INSERT INTO topic(name) VALUES ('Wat vinden jullie van zuur bier?');

INSERT INTO message(topics_id, content) VALUES (1, 'Testpost 1!');
INSERT INTO message(topics_id, content) VALUES (1, 'Deze post hoort bij het eerste test-topic.');

INSERT INTO message(topics_id, content) VALUES (2, 'Bier hoort zoet te zijn.');
INSERT INTO message(topics_id, content) VALUES (2, 'Bier moet hoppig zijn!');

