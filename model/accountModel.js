const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const accountSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, 'Please enter username'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'Please enter a valid email'],
	},

	password: {
		type: String,
		required: [true, 'Please enter password'],
		minlength: [6, 'The minimum password length is 6 characters'],
	},

	role: {
		type: String,
		default: 'user',
	},
});

// middleware for hashing password
accountSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const Account = new mongoose.model('Account', accountSchema);
module.exports = Account;
