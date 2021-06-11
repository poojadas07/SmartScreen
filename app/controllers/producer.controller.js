const kafka = require ('kafka-node');

const Producer = kafka.Producer;

const client = new kafka.KafkaClient();

const producer = new Producer(client);

exports.produce = (req, res ) => {
    const payloads = [
        { topic: 'example', messages: ['0'], partition: 0 } ,
    ];

    producer.send(payloads , function(error, data) {
        if(error) {
            res.send(error);
            // console.error(error);
        }
        else{
            res.send(data);
            // console.log(data);
        }
    });
}