const mongoose = require('mongoose');
const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // Months are zero-indexed, so we need to add 1
const day = now.getDate();

let returnDay = day + 3;
let borrowStatus = '';

const options = { month: 'long', day: 'numeric', year: 'numeric' };
const formattedDateOfReturn = new Date(year, month - 1, returnDay).toLocaleString('en-US', options);
const formattedDate = new Date(year, month - 1, day).toLocaleString('en-US', options);

const borrowerSchema = new mongoose.Schema({
	borrowImg: {
		type: String,
	},

	borrowName: {
		type: String,
		required: true,
	},

	borrowAddress: {
		type: String,
		required: true,
	},
	borrowPhone: {
		type: Number,
		required: true,
	},
	borrowAge: {
		type: Number,
		required: true,
	},
	borrowBirthday: {
		type: String,
		required: true,
	},

	dateBorrowed: {
		type: String,
		default: formattedDate,
	},

	dateReturn: {
		type: String,
		default: formattedDateOfReturn,
	},

	itemName: {
		type: String,
		required: true,
	},

	itemQuantity: {
		type: Number,
	},

	borrowReason: {
		type: String,
	},
});

module.exports = mongoose.model('Borrower', borrowerSchema);
