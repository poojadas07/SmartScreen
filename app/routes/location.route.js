module.exports = (app) => {
    const region = require('../controllers/region.controller.js');

    // Create a new region
    app.post('/region' , region.create);

    // Reterive all regions
    app.get('/region' , region.findAll);

    // Reterive the single region
    app.get('/region/:regionId' , region.findOne);

    // Update the single region
    app.put('/region/:regionId' , region.update);

    // Delete the single region
    app.delete('/region/:regionId' , region.delete);
}
