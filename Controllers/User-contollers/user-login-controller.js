const express = require('express');
const routerLogin = express.Router();
const bcrypt = require('bcryptjs');

//Importing login Validation
const validateLoginInput = require('../../Validation/login');

//Import User Model
const User = require('../../Models/user');

routerLogin.post('/login', (req, res, next) => {
    // Form validation
    const {errors, isValid} = validateLoginInput(req.body);

    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    // Find user by email or user name
    User.find({email, username}).then(user => {
        if (!user) {
            return res.status(404).json({emailnotfound: 'Email or User name not found '});
        }
        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    username: user.username
                };
                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 3600 // 1 hour in seconds
                    },
                    (err, token) => {
                        res.status(200).json({
                            id: user.id,
                            username: user.username,
                            first_name: user.first_name,
                            last_name: user.last_name,
                            state: user.state,
                            address: user.address,
                            phone: user.phone,
                            avatar: user.avatar,
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res.status(400).json({passwordincorrect: 'Password incorrect'});
            }
        });
    });
});

module.exports = routerLogin;