const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/User.model');

const bcryptjs = require('bcryptjs');
const saltRounds = 10;

const routeGuard = require('../configs/route-guard.config');

router.post('/api/clients', (req, res, next) => {
	const { firstName, lastName, company, email, password } = req.body;

	if (!email || !password) {
		res.status(401).json({
			message: 'Mandatory fields are missing. Please provide email and password.'
		});
		return;
	}

	const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
	if (!regex.test(password)) {
		res.status(500).json({
			message:
				'Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.'
		});
		return;
	}

	bcryptjs
		.genSalt(saltRounds)
		.then(salt => bcryptjs.hash(password, salt))
		.then(hashedPassword => {
			return User.create({
				email,
				firstName,
				lastName,
				company,
				passwordHash: hashedPassword
			});
		})
		.then(user => {
			//   user.passwordHash = undefined;
			//console.log(user)
			res.status(200).json({ user });
		})
		.catch(err => {
			if (err instanceof mongoose.Error.ValidationError) {
				res.status(500).json({ message: err.message });
			} else if (err.code === 11000) {
				res.status(500).json({
					message: 'Username and email need to be unique. Either username or email is already used.'
				});
			} else {
				next(err);
			}
		});
});

router.get('/api/clients', (req, res) => {
	User.find({isAdmin:false})
		.then(clientsFromDB => res.status(200).json({ clients: clientsFromDB }))
		.catch(err => next(err));
});


module.exports = router;
