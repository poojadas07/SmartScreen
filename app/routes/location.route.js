module.exports = (app) => {
    const location = require('../controllers/location.controller.js');

    // Create a new location
    app.post('/location' , location.create);

    // Reterive all locations
    app.get('/location' , location.findAll);

    // Reterive the single location
    app.post('/location/search' , location.findByName);

    // Reterive the single location
    app.get('/location/:locationId' , location.findOne);

    // Reterive the single locationByRegion
    app.get('/location/region/:regionId' , location.findOneByRegion);

    // Update the single location
    app.put('/location/:locationId' , location.update);

    // Delete the single location
    app.delete('/location/:locationId' , location.delete);
}
