module.exports = (app) => {
    const department = require('../controllers/department.controller.js');

    // Create a new department
    app.post('/department' , department.create);

    // Reterive all departments
    app.get('/department' , department.findAll);

    // Reterive the single department by id
    app.get('/department/:departmentId' , department.findOne);

    // Reterive the single department by name
    app.post('/department/search' , department.findByName);

    // Update the single department
    app.put('/department/:departmentId' , department.update);

    // Delete the single department
    app.delete('/department/:departmentId' , department.delete);
}