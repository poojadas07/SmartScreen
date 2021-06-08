const PDFDocument = require('pdfkit');
const fs = require('fs');

exports.pdfGenerate = (req, res) => {

    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream('Report.pdf'));
    pdfDoc.text("My Sample PDF Document in nodejsff");
    pdfDoc.end();
    res.send("Pdf generated successfully !!");

};