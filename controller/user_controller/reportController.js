// imports
const express = require('express');
const User = require('../../model/userModel');
const Report = require('../../model/blotterModel');
const BlotterReport = require('../../model/blotterReportModel');
const multer = require('multer');
const csv = require('csv-parser');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const path = require('path');

// ♣ rendering report records ♣
exports.renderReports = async (req, res) => {
	try {
		const reports = await Report.find();
		res.render('user_pages/report_pages/view_report', { title: 'Reports Page', reports: reports });
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Viewing Reports Page Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/user');
		}
	}
};

// ♣ render report_user page ♣
exports.renderReportUser = async (req, res) => {
	try {
		let id = req.params.id;
		const user = await User.findById(id);

		res.render('user_pages/report_pages/report_user', {
			title: 'Report User',
			user: user,
		});
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Viewing Report User Page Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/user/citizens_record');
		}
	}
};

// ♣ report_user controller ♣
exports.reportUser = async (req, res) => {
	try {
		let id = req.params.id;
		const user = await User.findById(id);

		const options = { month: 'long', day: 'numeric', year: 'numeric' };
		const formattedDate = new Date(req.body.dateOfIncident).toLocaleString('en-US', options);

		const now = new Date();
		const year = now.getFullYear();
		const month = now.getMonth() + 1; // Months are zero-indexed, so we need to add 1
		const days = now.getDate();

		const defaultDate = new Date(year, month - 1, days).toLocaleString('en-US', options);

		await Report.create({
			name: user.name,
			reportImg: user.img,
			reportAddress: user.address,
			reportPhone: user.phone,
			reportAge: user.age,
			reportBirthday: user.birthday,
			citizenId: id,
			dateOfComplain: defaultDate,
			// titleOfComplain: req.body.reportTitle,
			// complain: req.body.complain,
			typeOfIncident: req.body.typeOfIncident,
			dateOfIncident: formattedDate,
			locationOfIncident: req.body.locationOfIncident,
			nameOfComplainant: req.body.nameOfComplainant,
			detailsOfIncident: req.body.detailsOfIncident,
		});

		await BlotterReport.create({
			blotterReportId: id,
			blotterReportName: user.name,
			blotterReportAddress: user.address,
			blotterReportPhone: user.phone,
			blotterReportDate: defaultDate,
			blotterReportTypeOfIncident: req.body.typeOfIncident,
			blotterReportDateOfIncident: formattedDate,
			blotterReportLocOfIncident: req.body.locationOfIncident,
			blotterReportComplainant: req.body.nameOfComplainant,
			blotterReportDetails: req.body.detailsOfIncident,
			img: user.img,
		});

		req.session.message = {
			titleMessage: 'Report Success',
			type: 'success',
			message: 'User successfully reported ✅ ',
		};
		res.redirect('/user/view_report');
	} catch (err) {
		if (err) {
			req.session.message = {
				titleMessage: 'Report Failed',
				type: 'warning',
				message: 'Something went wrong :( || Please contact the admin',
			};
			console.log(err);
			res.redirect('/user/view_report');
		}
	}
};

// ♣  mark as done confirmation ♣
exports.doneReport = async (req, res) => {
	try {
		let id = req.params.id;
		await Report.findByIdAndDelete(id);

		req.session.message = {
			titleMessage: 'Case Solved! ✅',
			type: 'success',
			message: 'Report Successfully Marked as Done ',
		};

		res.redirect('/user/view_report');
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Mark as done failed.',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/user/view_report');
		}
	}
};

// ♣  mark as done controller ♣
exports.doneReportConfirmation = async (req, res) => {
	try {
		let id = req.params.id;
		const reports = await Report.findById(id);

		res.render('user_pages/report_pages/doneConfirmation', {
			title: 'Confirmation',
			report: reports,
		});
	} catch (err) {
		if (err) {
			req.session.message = {
				titleMessage: 'Visiting Confirmation Page Failed',
				type: 'error',
				message: 'Something went wrong. Please Contact the Admin',
			};

			res.redirect('/user/view_report');
		}
	}
};

// ♣  render more_info_report page ♣
exports.renderMoreInfoReport = async (req, res) => {
	try {
		let id = req.params.id;
		const report = await Report.findById(id);
		res.render('user_pages/report_pages/more_info_report', {
			title: 'Report Information',
			report: report,
		});
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Viewing More Info about Reports Page Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/user');
		}
	}
};
