const Region = require('../model/region');

const Country = require('../model/country');

const Location = require('../model/location');

const Client = require('../model/client');

const Department = require('../model/department');

const Screens = require('../model/screen');

const Panels = require('../model/panel');

// create and save a new region
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Region can not be empty"
        });
    }
    
    Region.findOne({ "name": req.body.name })
    .then( data => {
        res.status(401).json("Region : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        // create region
        const region = new Region({
            name: req.body.name,
            createdAt: new Date(),
            updatedAt: new Date(),
            country_id: req.body.country_id,
        });

        region.save()
        .then(data => {
            res.status(200).json("Region : " + data.name + " Added Successfully !!");
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the region."
            });
        });
    });
    
};

exports.findAll = (req, res) => {
    Region.aggregate(
        [
            {
                $lookup:
                { 
                    from: 'countries',
                    localField:'country_id', 
                    foreignField:'_id',
                    as:'country'
                }
            },
            {   $unwind:"$country" },
        ]
    )
    .then( regions => {
        res.status(200).json(regions);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving regions."
        });
    });
};

// Retrieve and return region by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

    Region.aggregate(
        [
            {
                $lookup:
                { 
                    from: 'countries',
                    localField:'country_id', 
                    foreignField:'_id',
                    as:'country'
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
    .then(region => {
        res.status(200).json(region);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Regions."
        });
    })
}

// Find a single region with a regionId
exports.findOne = (req , res) => {
    Region.findById(req.params.regionId)
    .then( region => {
        if(!region){
            res.status(404).json({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.status(200).json(region);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({
                message: "Region not found with id " + req.params.regionId
            });
        }
        return res.status(500).json({
            message: "Error retrieving region with id " + req.params.regionId
        });
    });
};

// Find a single region with a countryId
exports.findOneByCountry = (req , res) => {
    Region.find({
        "country_id" :  req.params.countryId 
    })
    .then(region => {
        res.status(200).json(region);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving Regions."
        });
    });
};

// Update a region identified by the regionId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Region cannot be empty"
        });
    }

    // Find region and update it with the request body

    Region.findOne({ "name": req.body.name })
    .then( data => {
        res.status(401).json("Region : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        Region.findByIdAndUpdate(req.params.regionId , {
            name: req.body.name ,
            updatedAt: new Date(),
            country_id: req.body.country_id,
        }, {new : true})
        .then(region => {
            if(!region){
                return res.status(404).json({
                    message: "Region not found with id " + req.params.regionId
                });
            }
            res.status(200).json("Region : " + region.name + " Updated Successfully !!");
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "Region not found with id " + req.params.regionId
                });
            }
            return res.status(500).json({
                message: "Error updating region with id " + req.params.regionId
            });
        });
    });
};

// Delete a region with the specified regionId in the request
exports.delete = (req, res) => {
    Region.findByIdAndRemove(req.params.regionId)
    .then(region => {
        if(!region){
            return res.status(404).json({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.status(200).json({message: "Region deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).json({
                message: "Region not found with id " + req.params.regionId
            });
        }
        return res.status(500).json({
            message: "Could not delete region with id " + req.params.regionId
        });
    });

    Location.remove( { "region_id": req.params.regionId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Client.remove( { "region_id": req.params.regionId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Department.remove( { "region_id": req.params.regionId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Screens.remove( { "region_id": req.params.regionId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Panels.remove( { "region_id": req.params.regionId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });
};