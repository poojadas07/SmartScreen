module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    // Create a new user
    app.post('/login' , user.find);

    // Reterive all users
    app.post('/register' , user.create);

    app.post('/forgot' , user.forgotPass);
    
    // Reterive the single user
    app.get('/user/:userId' , user.findOne);

    // Update the single user
    app.put('/user/:userId' , user.update);

    // Delete the single user
    app.delete('/user/:userId' , user.delete);
}