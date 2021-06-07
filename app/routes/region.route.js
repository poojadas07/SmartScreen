module.exports = (app) => {
    const region = require('../controllers/region.controller.js');

    const Region = require('../model/region');

    // Create a new region
    app.post('/region' , region.create);

    // Reterive all regions
    // app.get('/region' , region.findAll);

    app.get("/feedback-region", async (req, res) => {
        const result = await Region.findOne({ _id: "60bc9c192ad1b8fd9af22787" }).populate({
          path: "location"
        });
      
        // res.send(result.region[0].name);
        res.send(result);
      });

    app.get("/region" , region.findAll);

    // Reterive the single region
    app.post('/region/search' , region.findByName);

    // Reterive the single region
    app.get('/region/:regionId' , region.findOne);

    // Reterive the single regionByCountry
    app.get('/region/country/:countryId' , region.findOneByCountry);

    // Update the single region
    app.put('/region/:regionId' , region.update);

    // Delete the single region
    app.delete('/region/:regionId' , region.delete);
}
