const CertificateReport = require('../../model/certficateReportModel');
const BorrowReport = require('../../model/borrowerReportModel');
const BlotterReport = require('../../model/blotterReportModel');

// ♣ render material request controller ♣
exports.renderMaterialRecordsPage = async (req, res) => {
	try {
		const materialRecord = await BorrowReport.find();
		res.render('user_pages/dashboard_pages/records_pages/material_records', {
			title: 'Material Borrowers Report',
			materialRecord: materialRecord,
		});
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Rendering all Records Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/');
		}
	}
};

// ♣ render blotter record controller ♣
exports.renderBlotterRecordsPage = async (req, res) => {
	try {
		const blotterRecord = await BlotterReport.find();
		res.render('user_pages/dashboard_pages/records_pages/blotter_records', {
			title: 'Citizen Report',
			blotterRecord: blotterRecord,
		});
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Rendering all Records Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/');
		}
	}
};

// ♣ render certificate record controller ♣
exports.renderCertificateRecordsPage = async (req, res) => {
	try {
		const certificateRecord = await CertificateReport.find();
		res.render('user_pages/dashboard_pages/records_pages/certificate_records', {
			title: 'Citizen Report',
			certificateRecord: certificateRecord,
		});
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Rendering all Records Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/');
		}
	}
};
