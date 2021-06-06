const Client = require('../model/client');

// create and save a new client
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Client can not be empty"
        });
    }

    console.log(req.body.name);

    // create client
    const client = new Client({
        name: req.body.name ,
    });

    client.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the client."
        });
    });
};


// Retrieve and return all locations from the database.
// exports.findAll = (req , res) => {
//     Location.find()
//     .then( locations => {
//         res.send(locations);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving locations."
//         });
//     });
// };

exports.findAll = (req, res) => {
    Client.aggregate(
        [
            {
                $lookup:
                { 
                    from: 'locations',
                    localField:'location_id', 
                    foreignField:'_id',
                    as:'location'
                }
            },
            {   
                $unwind:"$location"
            },
            {
                $lookup:
                { 
                    from: 'regions',
                    localField:'region_id', 
                    foreignField:'_id',
                    as:'region'
                }
            },
            {   
                $unwind:"$region"
            },
            {
                $lookup:{
                    from: "countries", 
                    localField: "country_id", 
                    foreignField: "_id",
                    as: "country"
                }
            },
            {   $unwind:"$country" },
        
        ]
    )
    .then( clients => {
        res.send(clients);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
};

// Retrieve and return client by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

    Client.find({
        "name" : {
            "$regex" : req.body.searchvalue , $options:'i'
        }
    })
    .then(client => {
        res.send(client);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving clients."
        });
    })
}

// Find a single client with a clientId
exports.findOne = (req , res) => {
    Client.findById(req.params.clientId)
    .then( client => {
        if(!client){
            res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send(client);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        return res.status(500).send({
            message: "Error retrieving client with id " + req.params.clientId
        });
    });
};

// Update a client identified by the clientId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Client cannot be empty"
        });
    }

    // Find client and update it with the request body
    Client.findByIdAndUpdate(req.params.clientId , {
        name: req.body.name ,
    }, {new : true})
    .then(client => {
        if(!client){
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send(client);
    }).catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        return res.status(500).send({
            message: "Error updating client with id " + req.params.clientId
        });
    });
};

// Delete a client with the specified clientId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client){
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.send({message: "Client deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).send({
                message: "Client not found with id " + req.params.clientId
            });
        }
        return res.status(500).send({
            message: "Could not delete client with id " + req.params.clientId
        });
    });
};