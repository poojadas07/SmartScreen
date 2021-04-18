const Location = require('../model/location.model');

// create and save a new location
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Location can not be empty"
        });
    }

    // create location
    const location = new Location({
        name: req.body.name || "Untitled Location",
        locationName: req.body.locationName || "Untitled Location"
    });

    location.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the location."
        });
    });
};


// Retrieve and return all locations from the database.
exports.findAll = (req , res) => {
    Location.find()
    .then( locations => {
        res.send(locations);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving locations."
        });
    });
};

// Find a single location with a locationId
exports.findOne = (req , res) => {
    Location.findById(req.params.locationId)
    .then( location => {
        if(!location){
            res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });
        }
        res.send(location);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Location not found with id " + req.params.locationId
            });
        }
        return res.status(500).send({
            message: "Error retrieving location with id " + req.params.locationId
        });
    });
};

// Update a region identified by the regionId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Region cannot be empty"
        });
    }

    // Find region and update it with the request body
    Region.findByIdAndUpdate(req.params.regionId , {
        name: req.body.name || "Untitles Region",
        countryName: req.body.countryName || "Untitled Country"
    }, {new : true})
    .then(region => {
        if(!region){
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.send(region);
    }).catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        return res.status(500).send({
            message: "Error updating region with id " + req.params.regionId
        });
    });
};

// Delete a region with the specified regionId in the request
exports.delete = (req, res) => {
    Region.findByIdAndRemove(req.params.regionId)
    .then(region => {
        if(!region){
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.send({message: "Region deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        return res.status(500).send({
            message: "Could not delete region with id " + req.params.regionId
        });
    });
};