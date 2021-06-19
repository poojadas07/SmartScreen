const kafka = require ('kafka-node');

const Consumer = kafka.Consumer;

const client = new kafka.KafkaClient();

const RawData = require('../model/rawData');

const Panel = require('../model/panel');

exports.consume = (req, res) => { 

    const consumer = new Consumer (
		client,
				[
					{ topic: 'example', partition: 0 }
				],
				{
					autoCommit: false
				}
	);

	consumer.on('message', function(message, error) {
		if(error) {
            // res.send(error);
            console.error(error);
        }
        else{
            // res.send(message);
            console.log(message.value);

			// create RawData
			const rawdata = new RawData({
				val: message.value ,
				sensorId: "AB1233",
				createdAt: new Date(),
				updatedAt: new Date(),
			});
		
			rawdata.save()
			.then(data => {
				// res.send(data);
				console.log(data);
			})
			.catch(err => {
				console.log(err);
				// res.status(500).send({
				// 	message: err.message || "Some error occurred while creating the rawdata."
				// });
			});


			//Add value to the panel
			Panel.findOne({ "sensor_id": rawdata.sensorId })
			.then(data => {
				// res.send(data);
				if (data.current_value == message.value){
					Panel.findByIdAndUpdate(data._id , {
						current_updated_time: new Date(),
					}, {new : true})
					.then(panel => {
						if(!panel){
							return res.status(404).json({
								message: "Panel not found with id " + data._id
							});
						}
						res.status(200).json(panel);
					}).catch(err => {
						if(err.kind === "ObjectId"){
							return res.status(404).json({
								message: "Panel not found with id " + data._id
							});
						}
						return res.status(500).json({
							message: "Error updating panel with id " + data._id
						});
					});
				}
				else {
					Panel.findByIdAndUpdate(data._id , {
						previous_value: data.current_value,
						previous_time_value: data.current_time_value,
						previous_updated_time: data.current_updated_time,
						current_value: message.value,
						current_time_value: new Date(),
						current_updated_time: new Date(),
					}, {new : true})
					.then(panel => {
						if(!panel){
							return res.status(404).json({
								message: "Panel not found with id " + data._id
							});
						}
						res.status(200).json(panel);
					}).catch(err => {
						if(err.kind === "ObjectId"){
							return res.status(404).json({
								message: "Panel not found with id " + data._id
							});
						}
						return res.status(500).json({
							message: "Error updating panel with id " + data._id
						});
					});
				}
				console.log(data);
			})
			.catch(err => {
				console.log(err);
			});


        }
	});

}