module.exports = (app) => {
    const panel = require('../controllers/panel.controller.js');

    // Reterive all panels
    app.get('/panel' , panel.findAll);

    // Reterive the single panel by id
    app.get('/panel/:panelId' , panel.findOne);

     // Reterive the single panelByDepartment
     app.get('/panel/screen/:screenId' , panel.findOneByScreen);

}