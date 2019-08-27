const request = require('request'),
	middlewares = require('../middlewares');

module.exports = () => {
	const login = (req, res) => {
		console.log(req.body);
		request({
			uri: process.env.AUTH,
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(req.body),
		}, (err, response, body) => {
			console.log(body);
			if (!err && response.statusCode === 200) {
				body = JSON.parse(body).data;
				if (body.token && body.user) {
					req.session.userInfo.isLoggedIn = true;
    				req.session.userInfo.user = body.user;
    				req.session.userInfo.token = body.token;
				}
				res.status(200).send({ status: "success", data: {'isLoggedIn' : true} });	
			} else res.status(200).send({ status: "failure", data: {} });
		});
	};

	const register = (req, res) => {
		console.log(req.body);
		request({
			uri: process.env.AUTH,
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
			body: JSON.stringify(req.body),
		}, (err, response, body) => {
			console.log(body);
			if (!err && response.statusCode === 200) {
				body = JSON.parse(body).data;
				if (body.token && body.user) {
					req.session.userInfo.isLoggedIn = true;
    				req.session.userInfo.user = body.user;
    				req.session.userInfo.token = body.token;
				}
				res.status(200).send({ status: "success", data: {'isLoggedIn' : true} });	
			} else res.status(200).send({ status: "failure", data: {} });
		});
	};

	const payment = (req, res) => {
		console.log(req.body);
		request({
			uri: process.env.ORDER,
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
				if (body.orderStatus)
					res.status(200).send({ status: "success"});
			} else res.status(200).send({ status: "failure", data: {} });
		});
	};

	return {
		login: login,
		register: register,
		payment: payment
	}
};