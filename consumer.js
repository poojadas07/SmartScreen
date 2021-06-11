const kafka = require ('kafka-node');

const Consumer = kafka.Consumer;

const client = new kafka.KafkaClient();

const consumer = new Consumer (
	client,
			[
				{ topic: 'example', partition: 0 }
			],
			{
				autoCommit: false
			}
);

consumer.on('message', function(message) {
	console.log(message);
})