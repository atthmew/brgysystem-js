const CertificateReport = require('../../model/certficateReportModel');
const BorrowReport = require('../../model/borrowerReportModel');
const BlotterReport = require('../../model/blotterReportModel');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const fs = require('fs');
const path = require('path');
// ♣ render material request controller ♣
exports.renderMaterialRecordsPage = async (req, res) => {
	try {
		const materialRecord = await BorrowReport.find();
		res.render('admin_pages/dashboard_pages/records_pages/material_records', {
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
		res.render('admin_pages/dashboard_pages/records_pages/blotter_records', {
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
		res.render('admin_pages/dashboard_pages/records_pages/certificate_records', {
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

// ♣ material report controller ♣
exports.downloadMaterialReport = async (req, res) => {
	try {
		const borrowReport = await BorrowReport.find(); // Fetch all borrowReport from the database

		// Load the docx file as binary content
		const content = fs.readFileSync(
			path.resolve(`${__dirname}/../../certificates/borrow_report_template.docx`),
			'binary'
		);

		const zip = new PizZip(content);
		const doc = new Docxtemplater(zip);

		const tableData = borrowReport.map((data) => ({
			name: data.borrowReportName,
			itemBorrowed: data.borrowReportItemBorrowed,
			itemQuantity: data.borrowReportItemQuantity,
			dateBorrowed: data.borrowReportDate,
			expectedReturn: data.borrowReportExpectedReturn,
			phone: data.borrowReportPhone,
		}));

		// Generate the dynamic table in the template
		const templateData = {
			table: tableData,
		};

		doc.setData(templateData);
		doc.render();

		const buf = doc.getZip().generate({ type: 'nodebuffer' });

		// Set the response header for downloading the file
		res.set({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'Content-Disposition': 'attachment; filename=borrow_report.docx',
		});

		// Send the rendered document to the client
		res.send(buf);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

// ♣ certificate report controller ♣
exports.downdloadCertReport = async (req, res) => {
	try {
		const certReport = await CertificateReport.find(); // Fetch all certReport from the database

		// Load the docx file as binary content
		const content = fs.readFileSync(
			path.resolve(`${__dirname}/../../certificates/cert_report_template.docx`),
			'binary'
		);

		const zip = new PizZip(content);
		const doc = new Docxtemplater(zip);

		const tableData = certReport.map((data) => ({
			name: data.certReportName,
			address: data.certReportAddress,
			phone: data.certReportPhone,
			date: data.certReportDate,
			certType: data.certificateReportType,
		}));

		// Generate the dynamic table in the template
		const templateData = {
			table: tableData,
		};

		doc.setData(templateData);
		doc.render();

		const buf = doc.getZip().generate({ type: 'nodebuffer' });

		// Set the response header for downloading the file
		res.set({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'Content-Disposition': 'attachment; filename=certificate_report.docx',
		});

		// Send the rendered document to the client
		res.send(buf);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Something went wrong' });
	}
};

// // ♣ blotter report controller ♣
exports.downdloadBlotterReport = async (req, res) => {
	try {
		const blotterReport = await BlotterReport.find(); // Fetch all blotterReport from the database

		// Load the docx file as binary content
		const content = fs.readFileSync(
			path.resolve(`${__dirname}/../../certificates/blotter_report_template.docx`),
			'binary'
		);

		const zip = new PizZip(content);
		const doc = new Docxtemplater(zip);

		const tableData = blotterReport.map((data) => ({
			name: data.blotterReportName,
			dateOfIncident: data.blotterReportDateOfIncident,
			dateOfComplain: data.blotterReportDate,
			address: data.blotterReportAddress,
			violation: data.blotterReportTypeOfIncident,
			nameOfComplainant: data.blotterReportComplainant,
		}));

		// Generate the dynamic table in the template
		const templateData = {
			table: tableData,
		};

		doc.setData(templateData);
		doc.render();

		const buf = doc.getZip().generate({ type: 'nodebuffer' });

		// Set the response header for downloading the file
		res.set({
			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
			'Content-Disposition': 'attachment; filename=blotter_report.docx',
		});

		// Send the rendered document to the client
		res.send(buf);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Something went wrong' });
	}
};
