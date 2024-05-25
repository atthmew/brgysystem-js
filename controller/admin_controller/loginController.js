const User = require('../../model/userModel');
const Report = require('../../model/blotterModel');
const Borrower = require('../../model/borrowerModel');
const Account = require('../../model/accountModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// creating token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, "raven's secret", {
		expiresIn: maxAge,
	});
};

// ♣ render sign up ♣
exports.renderSignUp = async (req, res) => {
	try {
		res.render('auth/signup', { title: 'Sign Up Page' });
	} catch (err) {
		console.log(err);
	}
};

// ♣ render log in ♣
exports.renderLogin = async (req, res) => {
	try {
		res.render('auth/login', { title: 'Log In Page' });
	} catch (err) {
		console.log(err);
	}
};

// ♣ sign up controller ♣
exports.signUp = async (req, res) => {
	try {
		const newAcc = await Account.create({
			email: req.body.email,
			password: req.body.password,
		});
		req.session.message = {
			titleMessage: 'Success',
			type: 'success',
			message: 'User added successfuly ✅',
		};
		res.redirect('/');
	} catch (err) {
		console.log(err);
	}
};

// ♣ log in controller ♣
exports.logIn = async (req, res) => {
	try {
		const isThereEmail = await Account.findOne({ email: req.body.email });
		if (isThereEmail) {
			const currentAcc = await Account.findById(isThereEmail._id);
			const token = createToken(currentAcc._id);
			res.cookie('jwt', token, { httpOnly: true, magAge: maxAge * 1000 });
			const auth = await bcrypt.compare(req.body.password, currentAcc.password);
			if (auth) {
				if (currentAcc.role === 'admin') {
					console.log('admin');
					res.redirect('/');
				} else if (currentAcc.role === 'user') {
					console.log('not admin');
					res.redirect('/user/');
				}
			} else {
				console.log('wrong password');
				req.session.message = {
					titleMessage: 'Error',
					type: 'error',
					message: 'Wrong email or password ❌',
				};
				res.redirect('/login');
			}
		} else {
			console.log('email not found');
			req.session.message = {
				titleMessage: 'Error',
				type: 'error',
				message: 'Email not found ❌',
			};
			res.redirect('/login');
		}
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Oh no...',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/login');
		}
	}
};

// ♣ log out controller ♣
exports.logOut = async (req, res) => {
	try {
		res.cookie('jwt', '', { maxAge: 1 });
		res.redirect('/');
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Oh no...',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/login');
		}
	}
};
