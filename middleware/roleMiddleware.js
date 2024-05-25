const Account = require('../model/accountModel');

const roleMiddleware = async (req, res, next) => {
	try {
		const isThereEmail = await Account.exists({ email: req.body.email });
		console.log(isThereEmail);
		next();
	} catch (err) {}
};

module.exports = { roleMiddleware };
