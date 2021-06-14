const Country = require('../model/country');

const Region = require('../model/region');

const Location = require('../model/location');

const Client = require('../model/client');

const Department = require('../model/department');

const Screens = require('../model/screen');

const Panels = require('../model/panel');


// create and save a new country
exports.create = (req, res) => {
    
    // Validate request
    if(!req.body.name){
        return res.status(400).json({
            message: "Country can not be empty"
        });
    }

    console.log(req.body);

    const country = new Country({
        name: req.body.name,
        createdAt: new Date(),
        updatedAt: new Date(),
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

    Country.find().populate({
        path: "children",
        model: Region,
        populate: {
            path: "children",
            model: Location,
            populate: {
                path: "children",
                model: Client,
                populate: {
                    path: "children",
                    model: Department,
                    populate: {
                        path: "children",
                        model: Screens
                    }
                }
            }
        }
      })
      .then( countries => {
        res.send(countries);
        // console.log(countries)
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
        name: req.body.name,
        updatedAt: new Date(),
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

    Region.remove( { "country_id": req.params.countryId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Location.remove( { "country_id": req.params.countryId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Client.remove( { "country_id": req.params.countryId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Department.remove( { "country_id": req.params.countryId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Screens.remove( { "country_id": req.params.countryId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Panels.remove( { "country_id": req.params.countryId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });
};