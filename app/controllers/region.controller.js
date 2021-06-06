const Region = require('../model/region');

// create and save a new region
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Region can not be empty"
        });
    }

    console.log(req.body);
    
    // create region
    const region = new Region({
        name: req.body.name,
        country_id: req.body.country_id,
    });

    region.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the region."
        });
    });
};


// Retrieve and return all regions from the database.
// exports.findAll = (req , res) => {
//     Region.find()
//     .then( regions => {
//         res.send(regions);
//     })
//     .catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving regions."
//         });
//     });
// };

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
        res.send(regions);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving regions."
        });
    });
};

// Retrieve and return region by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

    Region.find({
        "name" : {
            "$regex" : req.body.searchvalue , $options:'i'
        }
    })
    .then(region => {
        res.send(region);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Regions."
        });
    })
}

// Find a single region with a regionId
exports.findOne = (req , res) => {
    Region.findById(req.params.regionId)
    .then( region => {
        if(!region){
            res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.send(region);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Region not found with id " + req.params.regionId
            });
        }
        return res.status(500).send({
            message: "Error retrieving region with id " + req.params.regionId
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
    Region.findByIdAndUpdate(req.params.regionId , {
        name: req.body.name ,
        country_id: req.body.country_id,
    }, {new : true})
    .then(region => {
        if(!region){
            return res.status(404).json({
                message: "Region not found with id " + req.params.regionId
            });
        }
        res.send(region);
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