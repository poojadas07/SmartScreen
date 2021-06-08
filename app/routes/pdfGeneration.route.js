module.exports = (app) => {

    const pdfGeneration = require('../controllers/pdfGeneration.controller.js');

    app.get("/generateReport", pdfGeneration.pdfGenerate );
}