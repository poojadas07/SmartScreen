module.exports = (app) => {
    const country = require('../controllers/country.controller.js');

    // Create a new country
    app.post('/country' , country.create);

    // Reterive all countries
    app.get('/country' , country.findAll);

    // Reterive the single country
    app.get('/country/:countryId' , country.findOne);

    // Update the single country
    app.put('/country/:countryId' , country.update);

    // Delete the single country
    app.delete('/country/:countryId' , country.delete);
}