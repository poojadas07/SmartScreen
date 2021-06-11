const Panel = require('../model/panel');

exports.findAll = (req, res) => {
    Panel.aggregate(
        [
            {
                $lookup:
                { 
                    from: 'screens',
                    localField:'screen_id', 
                    foreignField:'_id',
                    as:'screen'
                }
            },
            {   
                $unwind:"$screen"
            },
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
    .then( panels => {
        res.send(panels);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving panels."
        });
    });
};

// Find a single panel with a panelsId
exports.findOne = (req , res) => {
    Panel.findById(req.params.panelId)
    .then( panel => {
        if(!panel){
            res.status(404).send({
                message: "Panel not found with id " + req.params.panelId
            });
        }
        res.send(panel);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "Panel not found with id " + req.params.panelId
            });
        }
        return res.status(500).send({
            message: "Error retrieving panel with id " + req.params.panelId
        });
    });
};

// Find a single panel with a screenId
exports.findOneByScreen = (req , res) => {
    Panel.find({
        "screen_id" :  req.params.departmentId 
    })
    .then(panel => {
        res.send(panel);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving panels."
        });
    });
};

exports.pairSensorWithPanel = (req, res) => {

    // console.log(req.body)
    Panel.findByIdAndUpdate(req.params.panelId, {
        sensor_id: req.body.sensorId,
        updatedAt: new Date(),
    }, {new : true})
    .then(panel => {
        if(!panel){
            return res.status(404).send({
                message: "Panel not found with id " + req.params.panelId
            });
        }
        res.send(panel);
    }).catch(err => {
        if(err.kind === "ObjectId"){
            return res.status(404).send({
                message: "Panel not found with id " + req.params.panelId
            });
        }
        return res.status(500).send({
            message: "Error updating panel with id " + req.params.panelId
        });
    });
}