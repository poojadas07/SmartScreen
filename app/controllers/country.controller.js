const Country = require('../model/country');

const Region = require('../model/region');

const Location = require('../model/location');

const Client = require('../model/client');

const Department = require('../model/department');

const Screens = require('../model/screen');


// create and save a new country
exports.create = (req, res) => {
    
    // Validate request
    if(!req.body.name){
        return res.status(400).json({
            message: "Country can not be empty"
        });
    }

    console.log(req.body.name);

    const country = new Country({
        name: req.body.name,
    });

    country.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the Country."
        });
    });
};

// Retrieve and return all countries from the database.
exports.findAll = (req , res) => {
    Country.find()
    .then( countries => {
        res.send(countries);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Countries."
        });
    });
};

exports.pop_country = (req , res) => {

    Country.findOne({ _id: "60bc9afb2ad1b8fd9af22784" }).populate({
        path: "region",
        model: Region,
        populate: {
            path: "location",
            model: Location,
            populate: {
                path: "client",
                model: Client,
                populate: {
                    path: "department",
                    model: Department,
                    populate: {
                        path: "screen",
                        model: Screens
                    }
                }
            }
        }
      })
      .then( countries => {
        res.send(countries);
      })
      .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Countries."
        });
      });
    
};

// Retrieve and return country by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

    Country.find({
        "name" : {
            "$regex" : req.body.searchvalue , $options:'i'
        }
    })
    .then(country => {
        res.send(country);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Countries."
        });
    })
}

// Find a single country with a countryId
exports.findOne = (req , res) => {
    Country.findById(req.params.countryId)
    .then( country => {
        if(!country){
            res.status(404).send({
                message: "Country not found with id " + req.params.countryId
            });
        }
        res.send(country);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Country not found with id " + req.params.countryId
            });
        }
        return res.status(500).send({
            message: "Error retrieving country with id " + req.params.countryId
        });
    });
};

// Update a country identified by the countryId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Country cannot be empty"
        });
    }

    // Find country and update it with the request body
    Country.findByIdAndUpdate(req.params.countryId , {
        name: req.body.name || "Untitles Country"
    }, {new : true})
    .then(country => {
        if(!country){
            return res.status(404).json({
                message: "Country not found with id " + req.params.countryId
            });
        }
        res.json(country);
    }).catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).json({
                message: "Country not found with id " + req.params.countryId
            });
        }
        return res.status(500).json({
            message: "Error updating country with id " + req.params.countryId
        });
    });
};

// Delete a country with the specified countryId in the request
exports.delete = (req, res) => {
    Country.findByIdAndRemove(req.params.countryId)
    .then(country => {
        if(!country){
            return res.status(404).send({
                message: "Country not found with id " + req.params.countryId
            });
        }
        res.send({message: "Country deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).send({
                message: "Country not found with id " + req.params.countryId
            });
        }
        return res.status(500).send({
            message: "Could not delete country with id " + req.params.countryId
        });
    });
};