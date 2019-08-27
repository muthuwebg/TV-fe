const express = require('express'),
	router = express.Router(),
	middlewares = require('../middlewares'),
	ajax = require('./ajax')();


router.post('/login', ajax.login);
router.post('/register', ajax.register);
router.post('/payment', ajax.payment);


module.exports = router;