module.exports = (app) => {

    const producers = require('../controllers/producer.controller.js');
    
    app.get('/producer' , producers.produce);

}