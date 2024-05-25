const mongoose = require('mongoose');

const blotterReportSchema = new mongoose.Schema({
	blotterReportId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},

	blotterReportName: {
		type: String,
	},

	blotterReportAddress: {
		type: String,
	},

	blotterReportPhone: {
		type: String,
	},

	blotterReportDate: {
		type: String,
	},

	blotterReportTypeOfIncident: {
		type: String,
	},

	blotterReportDateOfIncident: {
		type: String,
	},

	blotterReportLocOfIncident: {
		type: String,
	},

	blotterReportComplainant: {
		type: String,
	},

	blotterReportDetails: {
		type: String,
	},

	img: {
		type: String,
		default: 'people.png',
	},
});

module.exports = mongoose.model('BlotterReport', blotterReportSchema);
