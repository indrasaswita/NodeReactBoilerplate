
const jwt = require('jsonwebtoken');

const ttl = 10; // in hours
const generateAccessToken = (username) => {
	const token = jwt
		.sign(
			{username},
			process.env.JWT_SECRET,
			{
				expiresIn: ttl + 'h',
				algorithm: "HS256"
			}
		);

	return {
		token,
		ttl: ttl * 3600, // in seconds
	};
};

module.exports = {
	generateAccessToken,
};