const Client = require('../model/client');

const Department = require('../model/department');

const Screens = require('../model/screen');

const Panels = require('../model/panel');

// create and save a new client
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Client can not be empty"
        });
    }

    Client.findOne({ "name": req.body.name })
    .then( data => {
        res.status(401).json("Client : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        // create client
        const client = new Client({
            name: req.body.name ,
            createdAt: new Date(),
            updatedAt: new Date(),
            location_id: req.body.location_id,
            region_id: req.body.region_id,
            country_id: req.body.country_id,
        });

        client.save()
        .then(data => {
            res.status(200).json("Client : " + data.name + " Added Successfully !!");
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the client."
            });
        });
    });
};

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
        res.status(200).json(clients);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving clients."
        });
    });
};

// Retrieve and return client by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

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
            {
                $match: {
                    "name": { $regex: req.body.searchvalue , $options:'i'}
                }
            }
        ]
    )
    .then(client => {
        res.status(200).json(client);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving clients."
        });
    })
}

// Find a single client with a clientId
exports.findOne = (req , res) => {
    Client.findById(req.params.clientId)
    .then( client => {
        if(!client){
            res.status(404).json({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.status(200).json(client);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({
                message: "Client not found with id " + req.params.clientId
            });
        }
        return res.status(500).json({
            message: "Error retrieving client with id " + req.params.clientId
        });
    });
};

// Find a single client with a locationId
exports.findOneByLocation = (req , res) => {
    Client.find({
        "location_id" :  req.params.locationId 
    })
    .then(client => {
        res.status(200).json(client);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Clients."
        });
    });
};

// Update a client identified by the clientId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Client cannot be empty"
        });
    }

    Client.findOne({ "name": req.body.name })
    .then( data => {
        res.status(401).json("Client : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        // Find client and update it with the request body
        Client.findByIdAndUpdate(req.params.clientId , {
            name: req.body.name ,
            updatedAt: new Date(),
            location_id: req.body.location_id,
            region_id: req.body.region_id,
            country_id: req.body.country_id,
        }, {new : true})
        .then(client => {
            if(!client){
                return res.status(404).json({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            res.status(200).json("Client : " + client.name + " Updated Successfully !!");
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "Client not found with id " + req.params.clientId
                });
            }
            return res.status(500).json({
                message: "Error updating client with id " + req.params.clientId
            });
        });
    });
};

// Delete a client with the specified clientId in the request
exports.delete = (req, res) => {
    Client.findByIdAndRemove(req.params.clientId)
    .then(client => {
        if(!client){
            return res.status(404).json({
                message: "Client not found with id " + req.params.clientId
            });
        }
        res.status(200).json({message: "Client deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).json({
                message: "Client not found with id " + req.params.clientId
            });
        }
        return res.status(500).json({
            message: "Could not delete client with id " + req.params.clientId
        });
    });

    Department.remove( { "client_id": req.params.clientId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Screens.remove( { "client_id": req.params.clientId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Panels.remove( { "client_id": req.params.clientId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });
};