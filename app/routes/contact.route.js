module.exports = (app) => {
    const contact = require('../controllers/contact.controller');

    // Create a new email
    app.post('/sendMail' , contact.send);
}