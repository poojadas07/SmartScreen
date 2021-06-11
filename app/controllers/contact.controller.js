const nodeMailer = require('nodemailer');

exports.send = (req, res) => {
    
    console.log(req.body);

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
        subject: 'Registration Details !!',
        html: '<h1>Registration Successfull !!</h1>'+
                '<p>Email : '+ req.body.email +'</p><p>Password : '+ req.body.password+'</p>',
      };
  
    transporter.sendMail(mailOptions)
    .then(data => {
        res.status(200).json("Message sent successfully: " + data.response);
    })
    .catch(err => {
        res.status(500).json({
            message: err.message || "Failed to send email"
        });
    });
};

