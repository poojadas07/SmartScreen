const kafka = require ('kafka-node');

const Producer = kafka.Producer;

const client = new kafka.KafkaClient();

const producer = new Producer(client);

exports.produce = (req, res ) => {
    const payloads = [
        { topic: 'example', messages: ['-1'], partition: 0 } ,
    ];

    producer.send(payloads , function(error, data) {
        if(error) {
            res.send(error);
            // console.error(error);
        }
        else{
            res.status(200).json(data);
            // console.log(data);
        }
    });
}