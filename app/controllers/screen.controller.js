const Screen = require('../model/screen');
const Panel = require('../model/panel');
const Department = require('../model/department');

// create and save a new screen
exports.create = (req, res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Screen can not be empty"
        });
    }

    console.log(req.body);

    // create screen
    const screen = new Screen({
        name: req.body.name ,
        rows: req.body.rows,
        columns: req.body.columns,
        status: req.body.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        department_id: req.body.department_id,
        client_id: req.body.client_id,
        location_id: req.body.location_id,
        region_id: req.body.region_id,
        country_id: req.body.country_id,
    });

    screen.save()
    .then(data => {
        res.send(data);

        for (let i=0; i<req.body.rows; i++){
            for (let j=0; j<req.body.columns; j++){
                const panel = new Panel({
                    name: "P-" + i + j,
                    row_no: i,
                    column_no: j,
                    current_value: 0,
                    current_time_value: new Date(),
                    current_updated_time: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    screen_id: data._id,
                    department_id: req.body.department_id,
                    client_id: req.body.client_id,
                    location_id: req.body.location_id,
                    region_id: req.body.region_id,
                    country_id: req.body.country_id,
                });

                panel.save();
            }
        }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the screen."
        });
    });
};

exports.screenPanel = (req , res) => {

    Screen.find().populate({
        path: "children",
        model: Panel,
      })
      .then( screens => {
        res.send(screens);
        // console.log(countries)
      })
      .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving screens."
        });
      });
    
};

exports.findAll = (req, res) => {
    Screen.aggregate(
        [
            {
                $lookup:
                { 
                    from: 'departments',
                    localField:'department_id', 
                    foreignField:'_id',
                    as:'department'
                }
            },
            {   
                $unwind:"$department"
            },
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
    .then( screens => {
        res.send(screens);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving screens."
        });
    });
};

// Retrieve and return screen by name from the database.
exports.findByName = (req , res) => {

    console.log(req.body.searchvalue);

    Screen.aggregate(
        [
            {
                $lookup:
                { 
                    from: 'departments',
                    localField:'department_id', 
                    foreignField:'_id',
                    as:'department'
                }
            },
            {   
                $unwind:"$department"
            },
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
    .then( screens => {
        res.send(screens)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving screens."
        });
    })
}

// Find a single screen with a screensId
exports.findOne = (req , res) => {
    Screen.findById(req.params.screenId)
    .then( screen => {
        if(!screen){
            res.status(404).send({
                message: "Screen not found with id " + req.params.screenId
            });
        }
        res.send(screen);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Screen not found with id " + req.params.screenId
            });
        }
        return res.status(500).send({
            message: "Error retrieving screen with id " + req.params.screenId
        });
    });
};

// Find a single screen with a departmentId
exports.findOneByDepartment = (req , res) => {
    Screen.find({
        "department_id" :  req.params.departmentId 
    })
    .then(screen => {
        res.send(screen);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving screens."
        });
    });
};

// Update a screen identified by the screenId in the request
exports.update = (req , res) => {
    // Validate request
    if(!req.body){
        return res.status(400).send({
            message: "Screen cannot be empty"
        });
    }

    // Find client and update it with the request body
    Screen.findByIdAndUpdate(req.params.screenId , {
        name: req.body.name ,
        status: req.body.status,
        updatedAt: new Date(),
        department_id: req.body.department_id,
        client_id: req.body.client_id,
        location_id: req.body.location_id,
        region_id: req.body.region_id,
        country_id: req.body.country_id,
    }, {new : true})
    .then(screen => {
        if(!screen){
            return res.status(404).send({
                message: "Screen not found with id " + req.params.screenId
            });
        }
        res.send(screen);
    }).catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Screen not found with id " + req.params.screenId
            });
        }
        return res.status(500).send({
            message: "Error updating screen with id " + req.params.screenId
        });
    });
};

// Delete a screen with the specified screenId in the request
exports.delete = (req, res) => {
    Screen.findByIdAndRemove(req.params.screenId)
    .then(screen => {
        if(!screen){
            return res.status(404).send({
                message: "Screen not found with id " + req.params.screenId
            });
        }
        res.send({message: "Screen deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).send({
                message: "Screen not found with id " + req.params.screenId
            });
        }
        return res.status(500).send({
            message: "Could not delete screen with id " + req.params.screenId
        });
    });
};