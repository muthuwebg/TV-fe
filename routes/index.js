const express = require('express'),
	request = require('request'),
	middleware = require('../middlewares'),
	router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', middleware.checkLoginStatus, (req, res, next) => {
	request({
		uri: process.env.PLANS,
		headers: {
			'Content-Type': 'application/json',
			'token': req.session.userInfo.token
		},
		method: 'POST',
		body: JSON.stringify(req.body),
	}, (err, response, body) => {
		console.log(body);
		if (!err && response.statusCode === 200) {
			body = JSON.parse(body).data;
  			res.render('dashboard', { dashboard: body });
		}
	});
});

router.get('/payment/:plan(sp|bp)', middleware.checkLoginStatus, (req, res, next) => {
	request({
		uri: process.env.PAYMENT,
		headers: {
			'Content-Type': 'application/json',
			'token': req.session.userInfo.token
		},
		method: 'POST',
		body: JSON.stringify({
			product: req.params.plan
		}),
	}, (err, response, body) => {
		console.log(body);
		if (!err && response.statusCode === 200) {
			body = JSON.parse(body).data;
			res.render('payment', { payment: body});
		}
	});
});

module.exports = router;
