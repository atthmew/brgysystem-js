const mongoose = require('mongoose');

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth() + 1; // Months are zero-indexed, so we need to add 1
const day = now.getDate();

const options = { month: 'long', day: 'numeric', year: 'numeric' };
const formattedDate = new Date(year, month - 1, day).toLocaleString('en-US', options);

const certRerportSchema = new mongoose.Schema({
	certReportId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},

	certReportName: {
		type: String,
	},

	certReportAddress: {
		type: String,
	},

	certReportPhone: {
		type: String,
	},

	certReportDate: {
		type: String,
		default: formattedDate,
	},

	certificateReportType: {
		type: String,
	},

	img: {
		type: String,
		default: 'people.png',
	},
});

module.exports = mongoose.model('CertificateReport', certRerportSchema);
