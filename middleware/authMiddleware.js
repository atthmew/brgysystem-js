const jwt = require('jsonwebtoken');

const requireAuth = (req, res, next) => {
	const token = req.cookies.jwt;

	// checks if the token exist and verified
	if (token) {
		jwt.verify(token, "raven's secret", (err, decodedToken) => {
			if (err) {
				console.log(err);
				res.redirect('/login');
			} else {
				// console.log(dxecodedToken);
				next();
			}
		});
	} else {
		res.redirect('/login');
	}
};

module.exports = { requireAuth };
