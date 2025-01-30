const express = require('express');
var app = express.Router();

const authController = require('../controllers/auth')

// Change the login route to POST
app.post('/login', authController.login);
app.post('/logout', authController.logout);

module.exports = app;
