const Department = require('../model/department');

const Screens = require('../model/screen');

const Panels = require('../model/panel');

// create and save a new department
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Department can not be empty"
        });
    }

    Department.findOne({ "name": req.body.name })
    .then( data => {
        res.status(207).json("Department : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        // create department
        const department = new Department({
            name: req.body.name ,
            createdAt: new Date(),
            updatedAt: new Date(),
            client_id: req.body.client_id,
            location_id: req.body.location_id,
            region_id: req.body.region_id,
            country_id: req.body.country_id,
        });

        department.save()
        .then(data => {
            res.status(200).json("Department : " + data.name + " Added Successfully !!");
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the department."
            });
        });
    });
};


// Retrieve and return all locations from the database.
// exports.findAll = (req , res) => {
//     Location.find()
//     .then( locations => {
//         res.json(locations);
//     })
//     .catch(err => {
//         res.status(500).json({
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
        res.status(200).json(departments);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving departments."
        });
    });
};

// Retrieve and return department by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

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
            {
                $match: {
                    "name": { $regex: req.body.searchvalue , $options:'i'}
                }
            }
        
        ]
    )
    .then(department => {
        res.status(200).json(department);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving departments."
        });
    })
}

// Find a single department with a departmentsId
exports.findOne = (req , res) => {
    Department.findById(req.params.departmentId)
    .then( department => {
        if(!department){
            res.status(404).json({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        res.status(200).json(department);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).json({
                message: "Deparment not found with id " + req.params.departmentId
            });
        }
        return res.status(500).json({
            message: "Error retrieving department with id " + req.params.departmentId
        });
    });
};

// Find a single department with a clientId
exports.findOneByClient = (req , res) => {
    Department.find({
        "client_id" :  req.params.clientId 
    })
    .then(department => {
        res.status(200).json(department);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while retrieving departments."
        });
    });
};

// Update a department identified by the departmentId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).json({
            message: "Department cannot be empty"
        });
    }

    Department.findOne({ "name": req.body.name })
    .then( data => {
        res.status(207).json("Department : " + data.name + " Already existed !!");     
    })
    .catch(err => {
        // Find department and update it with the request body
        Department.findByIdAndUpdate(req.params.departmentId , {
            name: req.body.name ,
            updatedAt: new Date(),
            client_id: req.body.client_id,
            location_id: req.body.location_id,
            region_id: req.body.region_id,
            country_id: req.body.country_id,
        }, {new : true})
        .then(department => {
            if(!department){
                return res.status(404).json({
                    message: "Department not found with id " + req.params.departmentId
                });
            }
            res.status(200).json("Department : " + department.name + " Updated Successfully !!");
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "Department not found with id " + req.params.departmentId
                });
            }
            return res.status(500).json({
                message: "Error updating department with id " + req.params.departmentId
            });
        });
    });
};

// Delete a department with the specified departmentId in the request
exports.delete = (req, res) => {
    Department.findByIdAndRemove(req.params.departmentId)
    .then(department => {
        if(!department){
            return res.status(404).json({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        res.status(200).json({message: "Department deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).json({
                message: "Department not found with id " + req.params.departmentId
            });
        }
        return res.status(500).json({
            message: "Could not delete department with id " + req.params.departmentId
        });
    });

    Screens.remove( { "department_id": req.params.departmentId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });

    Panels.remove( { "department_id": req.params.departmentId})
    .then(data => {
        console.log(data);
    })
    .catch(err =>{
        console.log(err);
    });
};
