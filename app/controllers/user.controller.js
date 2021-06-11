const User = require('../model/user');

// create and save a new country
exports.create = (req, res) => {
    
    // Validate request
    if(!req.body.email){
        return res.status(400).json({
            message: "Email can not be empty"
        });
    }

    if(!req.body.password){
        return res.status(400).json({
            message: "Password can not be empty"
        });
    }

    console.log(req.body);

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    user.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

exports.find = (req, res) => {
    // Validate request
    if(!req.body.email){
        return res.status(400).json({
            message: "Email can not be empty"
        });
    }

    if(!req.body.password){
        return res.status(400).json({
            message: "Password can not be empty"
        });
    }

    User.find({
        "email" : req.body.email ,
        "password": req.body.password ,
    })
    .then(user => {
        res.send(user);
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Users."
        });
    })
}

exports.findOne = (req, res) => {
    User.findById(req.params.userId)
    .then( user => {
        if(!user){
            res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send(user);
    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.userId
        });
    });
}

// Update a user identified by the userId in the request
exports.update = (req , res) => {

    // Find user and update it with the request body
    if (req.body.username){
        User.findByIdAndUpdate(req.params.userId , {
            username: req.body.username ,
            updatedAt: new Date(),
        }, {new : true})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.json(user);
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.userId
            });
        });
    }
    
    if (req.body.email){
        User.findByIdAndUpdate(req.params.userId , {
            email: req.body.email ,
            updatedAt: new Date(),
        }, {new : true})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.json(user);
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.userId
            });
        });
    }
    
    if (req.body.phone){
        User.findByIdAndUpdate(req.params.userId , {
            phone: req.body.phone ,
            updatedAt: new Date(),
        }, {new : true})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.json(user);
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.userId
            });
        });
    }
    
    if (req.body.password){
        User.findByIdAndUpdate(req.params.userId , {
            password: req.body.password ,
            updatedAt: new Date(),
        }, {new : true})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.json(user);
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.userId
            });
        });
    }
    
};

exports.forgotPass = (req , res) => {

        User.findByIdAndUpdate(req.params.userId , {
            password: req.body.password ,
            updatedAt: new Date(),
        }, {new : true})
        .then(user => {
            if(!user){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.json(user);
        }).catch(err => {
            if(err.kind === "ObjectId"){
                return res.status(404).json({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).json({
                message: "Error updating user with id " + req.params.userId
            });
        });
};

// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
    .then(user => {
        if(!user){
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        res.send({message: "User deleted sucessfully !"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === "Not Found"){
            return res.status(404).send({
                message: "User not found with id " + req.params.userId
            });
        }
        return res.status(500).send({
            message: "Could not delete user with id " + req.params.userId
        });
    });
};