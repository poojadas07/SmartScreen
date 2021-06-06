const Department = require('../model/department');

// create and save a new department
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Department can not be empty"
        });
    }

    // create department
    const department = new Department({
        name: req.body.name,
        client_id: req.body.client_id,
        location_id: req.body.location_id,
        region_id: req.body.region_id,
        country_id: req.body.country_id,
    });

    department.save()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the department."
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
    Department.aggregate(
        [
            {
                $lookup:
                { 
                    from: 'clients',
                    localField:'client_id', 
                    foreignField:'_id',
                    as:'client'
                }
            },
            {   
                $unwind:"$client"
            },
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
    .then( departments => {
        res.send(departments);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving departments."
        });
    });
};

// Retrieve and return department by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

    Department.find({
        "name" : {
            "$regex" : req.body.searchvalue , $options:'i'
        }
    })
    .then(department => {
        res.send(department);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving departments."
        });
    })
}

// Find a single department with a departmentId
exports.findOne = (req , res) => {
    Department.findById(req.params.departmentId)
    .then( department => {
        if(!department){
            res.status(404).send({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        res.send(department);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        return res.status(500).send({
            message: "Error retrieving department with id " + req.params.departmentId
        });
    });
};

// Update a department identified by the departmentId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Department cannot be empty"
        });
    }

    // Find department and update it with the request body
    Department.findByIdAndUpdate(req.params.departmentId , {
        name: req.body.name ,
    }, {new : true})
    .then(department => {
        if(!department){
            return res.status(404).send({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        res.send(department);
    }).catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        return res.status(500).send({
            message: "Error updating department with id " + req.params.departmentId
        });
    });
};

// Delete a department with the specified departmentId in the request
exports.delete = (req, res) => {
    Department.findByIdAndRemove(req.params.departmentId)
    .then(department => {
        if(!department){
            return res.status(404).send({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        res.send({message: "Department deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).send({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        return res.status(500).send({
            message: "Could not delete department with id " + req.params.departmentId
        });
    });
};