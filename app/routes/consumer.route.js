module.exports = (app) => {
	
	const consumer = require('../controllers/consumer.controller.js');
    
    app.get('/consumer' , consumer.consume );
}