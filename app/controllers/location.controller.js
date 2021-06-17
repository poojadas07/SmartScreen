const Location = require('../model/location');

const Client = require('../model/client');

const Department = require('../model/department');

const Screens = require('../model/screen');

const Panels = require('../model/panel');

// create and save a new location
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Location can not be empty"
        });
    }

    Location.findOne({ "name": req.body.name })
    .then( data => {
        res.status(401).json("Location : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        // create location
        const location = new Location({
            name: req.body.name ,
            createdAt: new Date(),
            updatedAt: new Date(),
            region_id: req.body.region_id,
            country_id: req.body.country_id,
        });

        location.save()
        .then(data => {
            res.status(200).json("Location : " + data.name + " Added Successfully !!");
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the location."
            });
        });
    });
};

exports.findAll = (req, res) => {
    Location.aggregate(
        [
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
    .then( locations => {
        res.status(200).json(locations);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving locations."
        });
    });
};

// Retrieve and return location by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

    Location.aggregate(
        [
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
    .then(location => {
        res.status(200).json(location);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving locations."
        });
    })
}

// Find a single location with a locationId
exports.findOne = (req , res) => {
    Location.findById(req.params.locationId)
    .then( location => {
        if(!location){
            res.status(404).json({
                message: "Location not found with id " + req.params.locationId
            });
        }
        res.status(200).json(location);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({
                message: "Location not found with id " + req.params.locationId
            });
        }
        return res.status(500).json({
            message: "Error retrieving location with id " + req.params.locationId
        });
    });
};

// Find a single location with a regionId
exports.findOneByRegion = (req , res) => {
    Location.find({
        "region_id" :  req.params.regionId 
    })
    .then(location => {
        res.status(200).json(location);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Locations."
        });
    });
};

// Update a location identified by the locationId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Location cannot be empty"
        });
    }

    // Find location and update it with the request body

    Location.findOne({ "name": req.body.name })
    .then( data => {
        res.status(401).json("Location : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        Location.findByIdAndUpdate(req.params.locationId , {
            name: req.body.name ,
            updatedAt: new Date(),
            region_id: req.body.region_id,
            country_id: req.body.country_id,
        }, {new : true})
        .then(location => {
            if(!location){
                return res.status(404).json({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            res.status(200).json("Location : " + location.name + " Updated Successfully !!");
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "Location not found with id " + req.params.locationId
                });
            }
            return res.status(500).json({
                message: "Error updating location with id " + req.params.locationId
            });
        });
    });
};

// Delete a region with the specified locationId in the request
exports.delete = (req, res) => {
    Location.findByIdAndRemove(req.params.locationId)
    .then(location => {
        if(!location){
            return res.status(404).json({
                message: "Location not found with id " + req.params.locationId
            });
        }
        res.status(200).json({message: "Location deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).json({
                message: "Location not found with id " + req.params.locationId
            });
        }
        return res.status(500).json({
            message: "Could not delete location with id " + req.params.locationId
        });
    });

    Client.remove( { "location_id": req.params.locationId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Department.remove( { "location_id": req.params.locationId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Screens.remove( { "location_id": req.params.locationId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Panels.remove( { "location_id": req.params.locationId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });
};