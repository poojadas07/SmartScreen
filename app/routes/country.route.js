const express = require('express');
const app = express();

const countryRoute = express.Router();
let Country = require('../model/country');


// Add Book
countryRoute.route('/country').post((req, res, next) => {
    console.log(req.body);
    if(req.body.name == ""){
        return res.status(400).json({
            message: "Country can not be empty"
        });
    }

    Country.create(req.body, (error, data) => {
    if (error) {
      return res.status(500).json({
            message: err.message || "Some error occurred while creating the Country."
        });
    } else {
      res.status(200).send(data);
    }
  })
});

// Get all Book
countryRoute.route('/country').get((req, res) => {
    Country.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get Book
countryRoute.route('/country/:id').get((req, res) => {
    Country.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Book
countryRoute.route('/country/:id').put((req, res, next) => {
    Country.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Book updated successfully!')
    }
  })
})

// Delete Book
countryRoute.route('/country/:id').delete((req, res, next) => {
    Country.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = countryRoute;
// module.exports = (app) => {
//     const country = require('../controllers/country.controller.js');

//     // Create a new country
//     app.post('/country' , country.create);

//     // Reterive all countries
//     app.get('/country' , country.findAll);

//     // Reterive the single country
//     app.get('/country/:countryId' , country.findOne);

//     // Reterive the single country
//     app.post('/country/search' , country.findByName);

//     // Update the single country
//     app.put('/country/:countryId' , country.update);

//     // Delete the single country
//     app.delete('/country/:countryId' , country.delete);
// }


// var express = require('express');
// var router = express.Router();
// var mongoose = require('mongoose');
// var Country = require('../model/country.model');

// /* GET ALL BOOKS */
// router.get('/', function(req, res, next) {
//     Country.find(function (err, products) {
//     if (err) return next(err);
//     res.json(products);
//   });
// });

// /* GET SINGLE BOOK BY ID */
// router.get('/:id', function(req, res, next) {
//     Country.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* SAVE BOOK */
// router.post('/', function(req, res, next) {
//     Country.create(req.body , function (err, post) {
//     if (err) return next(err);
//     console.log(req.body);
//     res.text(post);
//   });
// });

// /* UPDATE BOOK */
// router.put('/:id', function(req, res, next) {
//     Country.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// /* DELETE BOOK */
// router.delete('/:id', function(req, res, next) {
//     Country.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

// module.exports = router;