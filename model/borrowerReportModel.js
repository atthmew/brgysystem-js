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

const borrowerReportSchema = new mongoose.Schema({
	borrowReportId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},

	borrowReportName: {
		type: String,
	},

	borrowReportPhone: {
		type: String,
	},

	borrowReportAddress: {
		type: String,
	},

	borrowReportItemBorrowed: {
		type: String,
	},

	borrowReportItemQuantity: {
		type: String,
	},

	borrowReportReason: {
		type: String,
	},

	borrowReportDate: {
		type: String,
		default: formattedDate,
	},

	borrowReportExpectedReturn: {
		type: String,
		default: formattedDateOfReturn,
	},

	img: {
		type: String,
		default: 'people.png',
	},
});

module.exports = mongoose.model('BorrowerReport', borrowerReportSchema);
