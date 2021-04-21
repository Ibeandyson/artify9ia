const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../Config/db-config');
const mongoose = require('mongoose');

const passport = require('passport');

//Importing Registration Validation
const validateRegistrationInput = require('../../Validation/regitration');

//Import User Model
const user = require('../../Models/user');

// Create Registre Service
module.exports = {
    userRegistration: (req, res) => {
        //Form Validation
        const {errors, isValid} = validateRegistrationInput(req.body);

        //Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        //Adding New User
        user.findOne({email: req.body.email}).then(user => {
            if (user) {
                return res.status(400).json({email: 'Email already exist'});
            } else {
                const newUser = new user({
                    username: req.body.username,
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    state: req.body.state,
                    address: req.body.address,
                    phone: req.body.phone,
                    email: req.body.email,
                    password: req.body.password,
                    files: req.body.files
                });
                // Hash password before saving in database
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        newUser.password = hash;
                        newUser.save().the(user => res.jon(user)).catch(err => console.log(err));
                    });
                });
            }
        });
    }
};
