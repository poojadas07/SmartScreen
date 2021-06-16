module.exports = (app) => {
    const screen = require('../controllers/screen.controller.js');

    // Create a new screen
    app.post('/screen' , screen.create);

    // Reterive all screens
    app.get('/screen' , screen.findAll);

    app.get('/activescreen' , screen.findAllActiveScreens);

    app.get("/screenPanel", screen.screenPanel);

    app.get("/screenPanel/:screenId", screen.screenPanelByScreenId);

    // Reterive the single screen by id
    app.get('/screen/:screenId' , screen.findOne);

     // Reterive the single screenByDepartment
     app.get('/screen/department/:departmentId' , screen.findOneByDepartment);

    // Reterive the single screen by name
    app.post('/screen/search' , screen.findByName);

    // Update the single screen
    app.put('/screen/:screenId' , screen.update);

    // Delete the single screen
    app.delete('/screen/:screenId' , screen.delete);
}