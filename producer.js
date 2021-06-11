const kafka = require ('kafka-node');

const Producer = kafka.Producer;

const client = new kafka.KafkaClient();

const producer = new Producer(client);

const payloads = [
    { topic: 'example', messages: ['hello', 'hi', 'hey', 'hi'], partition: 0 } ,
];

producer.send(payloads , function(error, data) {
    if(error) {
        console.error(error);
    }
    else{
        console.log(data);
    }
})