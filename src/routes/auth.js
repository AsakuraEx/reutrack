const express = require('express');
var app = express.Router();

const authController = require('../controllers/auth')

// Change the login route to POST
app.post('/login', authController.login);
app.post('/verify-2fa', authController.verify2fa); // New route for verifying 2FA code

app.post('/logout', authController.logout);

module.exports = app;
