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
        to: 'archanadas1207@gmail.com',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
      };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        console.log(error);
      }
      else res.send("Message sent successfully: " + info.response);
    })
};

