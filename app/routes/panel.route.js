module.exports = (app) => {
    const panel = require('../controllers/panel.controller.js');

    // Add value to the panel
    // app.post('/panel' , panel.create);

    // Reterive all panels
    app.get('/panel' , panel.findAll);

    // Reterive the single panel by id
    app.get('/panel/:panelId' , panel.findOne);

     // Reterive the single panelByDepartment
     app.get('/panel/screen/:screenId' , panel.findOneByScreen);

     app.post('/panel/sensor/:panelId', panel.pairSensorWithPanel);

}