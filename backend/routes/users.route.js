const express = require('express');
const app = express();
const userRoute = express.Router();

let User = require('../models/User');

// Get all Users
userRoute.route('/').get((req, res) => {
    User.find((error, data) => {
      if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Get a single User by its ID
userRoute.route('/read-user/:id').get((req, res) => {
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Add an User to the db
userRoute.route('/add-user').post((req, res, next) => {
    User.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

// Updates an User's params
userRoute.route('/update-user/:id').put((req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = userRoute;