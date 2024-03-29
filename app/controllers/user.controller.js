const User = require('../model/user');
const nodeMailer = require('nodemailer');

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

    User.findOne({ "email": req.body.email })
    .then( data => {
        res.status(207).json("User Email : " + data.email + " Already existed !!");     
    })
    .catch(err => {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        user.save()
        .then(data => {
            res.status(200).json("User : " + data.email + " Added succesfully. Please login to continue !!");
        })
        .catch(err => {
            res.status(500).json({
                message: err.message || "Some error occurred while creating the User."
            });
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

    User.findOne({
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
        User.findOne({ "email": req.body.email })
        .then( data => {
            res.status(207).json("User Email : " + data.email + " Already existed !!");     
        })
        .catch(err => {
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
            res.json("User Email : "+ user.email+ " Updated Successfully !!");
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
        });
    }
    
    if (req.body.phone){
        User.findOne({ "phone": req.body.phone })
        .then( data => {
            res.status(207).json("User Phone : " + data.phone + " Already existed !!");     
        })
        .catch(err => {
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
                res.json("User Phone : "+ user.phone+ " Updated Successfully !!");
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

    User.findOne( { "email": req.body.email } )
    .then( user => {
        if(!user){
            res.status(404).send({
                message: "User not found with email " + req.body.email
            });
        }
        res.send(user.password);
        var transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: "poojadas04kv@gmail.com",
                pass: "innocentpooja07@"
            }
        });
        var mailOptions = {
            from: 'poojadas04kv@gmail.com',
            to: req.body.email,
            subject: 'Forgot Password',
            html: '<h1>Your Password !!</h1>'+
                    '<p>Password : '+ user.password +'</p>',
          };
      
        transporter.sendMail(mailOptions)
        .then(data => {
            console.log("Message sent successfully: " + data.response);
        })
        .catch(err => {
            console.log({
                message: err.message || "Failed to send email"
            });
        });

    })
    .catch(err => {
        if(err.kind === 'ObjectId'){
            return res.status(404).send({
                message: "User not found with email " + req.body.email
            });
        }
        return res.status(500).send({
            message: "Error retrieving user with email " + req.body.email
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
        res.status(200).json({message: "User deleted sucessfully !"});
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