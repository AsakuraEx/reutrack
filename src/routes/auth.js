const express = require('express');
var app = express.Router();

const authController = require('../controllers/auth')

app.get('/login',     authController.login)
app.post('/logout',  authController.logout)

module.exports = app;