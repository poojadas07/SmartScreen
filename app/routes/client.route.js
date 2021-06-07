module.exports = (app) => {
    const client = require('../controllers/client.controller.js');

    // Create a new client
    app.post('/client' , client.create);

    // Reterive all clients
    app.get('/client' , client.findAll);

    // Reterive the single client by id
    app.get('/client/:clientId' , client.findOne);

     // Reterive the single clientByLocation
     app.get('/client/location/:locationId' , client.findOneByLocation);

    // Reterive the single client by name
    app.post('/client/search' , client.findByName);

    // Update the single client
    app.put('/client/:clientId' , client.update);

    // Delete the single client
    app.delete('/client/:clientId' , client.delete);
}