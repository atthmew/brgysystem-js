const mongoose = require('mongoose');

const blotterSchema = new mongoose.Schema({
	citizenId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},

	name: {
		type: String,
	},

	reportImg: {
		type: String,
	},

	reportAddress: {
		type: String,
	},

	reportPhone: {
		type: Number,
		default: 0,
	},

	reportAge: {
		type: Number,
		default: 0,
	},

	reportBirthday: {
		type: String,
	},

	dateOfComplain: {
		type: String,
	},

	typeOfIncident: {
		type: String,
		required: true,
	},

	dateOfIncident: {
		type: String,
	},

	locationOfIncident: {
		type: String,
		required: true,
	},

	nameOfComplainant: {
		type: String,
		required: true,
	},

	detailsOfIncident: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Report', blotterSchema);
