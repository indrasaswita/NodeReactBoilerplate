

const express = require('express');
const encrypter = require('./../../helpers/encrypter');
const { generateAccessToken } = require('./helpers/auth');
const model = require('./../../models');
const router = express.Router();

// User Model
const { User: Users } = model.user;


/**
 * @method  POST
 * @router  /api/auth/login
 * @desc    set login and return its jwt ttl
 * @access  public
 */
router.post('/login', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;

	Users
		.findOne({email: username}, ['email', 'name', 'password'])
		.then(user => {
			const result = encrypter.check(password, user.password);
			const { token, ttl } = generateAccessToken(username);
			if(result)
				res.json({
					message: 'success',
					data: {
						token,
						ttl,
						user
					},
				});
			else
				res.status(403).json({
					message: 'wrong password input'
				});
		})
		.catch(error => {
			console.log(error);
			res.status(403).json({
				message: 'no user by email, ' + username,
			});
		});
});


/**
 * @method  POST
 * @router  /api/auth/register
 * @desc    save new user data
 * @access  public
 */
router.post('/register', (req, res) => {
	const hash = encrypter.encrypt(req.body.password);

	const newUser = new Users({
		name: req.body.name,
		email: req.body.email,
		address: req.body.address,
		password: hash,
		location: req.body.location,
	});

	newUser
		.save()
		.then(user => {
			res.json({
				message: 'success',
				data: {
					user: user
				},
			})
		});
});


/**
 * @method  POST
 * @router  /api/auth/logout
 * @desc    logout and remove login data
 * @access  public
 */
router.post('/logout', (req, res) => {
	// should have blacklisted Redis token
	// but currently was not worth to do that.
	// may be next time.
	return res
		.json({
			message: 'success',
		});
});


module.exports = router;