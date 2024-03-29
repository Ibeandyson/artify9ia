const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

//Importing Registration Validation
const validateRegistrationInput = require('../../Validation/regitration');

//Import User Model
const User = require('../../Models/user');

router.post('/registration', (req, res) => {
    //Form Validation
    const {errors, isValid} = validateRegistrationInput(req.body);

    //Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    //Adding New User
    User.findOne({email: req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: 'Email already exist'});
        } else {
            const newUser = new User({
                username: req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                state: req.body.state,
                address: req.body.address,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password,
                avatar: {
                    data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
                    contentType: 'image/png'
                }
            });
            console.log("image", fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)) )
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    }
                    newUser.password = hash;
                    newUser.save().then(user => res.status(201).json(user)).catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;
