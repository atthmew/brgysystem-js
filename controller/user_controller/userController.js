// imports
const express = require('express');
const User = require('../../model/userModel');
const Report = require('../../model/blotterModel');
const Account = require('../../model/accountModel');
const Borrower = require('../../model/borrowerModel');
const CertificateReport = require('../../model/certficateReportModel');
const BorrowReport = require('../../model/borrowerReportModel');
const BlotterReport = require('../../model/blotterReportModel');
const multer = require('multer');
const csv = require('csv-parser');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const path = require('path');
const bodyParser = require('body-parser');

// image upload
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './views/img/profilePics');
	},
	filename: function (req, file, cb) {
		cb(null, `${fieldname}_${Date.now()}_${file.originalname}`);
	},
});

// middleware for image upload
var uploadPic = multer({
	storage: storage,
}).single('image');

// dates
const today = new Date();
const day = today.getDate();
const month = today.getMonth() + 1;
let nameMonth = '';

// converting the number month into name month
if (month === 1) {
	nameMonth = 'January';
}
if (month === 2) {
	nameMonth = 'February';
}
if (month === 3) {
	nameMonth = 'March';
}
if (month === 4) {
	nameMonth = 'April';
}
if (month === 5) {
	nameMonth = 'May';
}
if (month === 6) {
	nameMonth = 'June';
}
if (month === 7) {
	nameMonth = 'July';
}
if (month === 8) {
	nameMonth = 'August';
}
if (month === 9) {
	nameMonth = 'September';
}
if (month === 10) {
	nameMonth = 'October';
}
if (month === 11) {
	nameMonth = 'November';
}
if (month === 12) {
	nameMonth = 'December';
}

// imports for addManyUsers
const fs = require('fs');
const { google } = require('googleapis');

const service = google.sheets('v4');
const credentials = require('../../credentials.json');

// Configure auth client
const authClient = new google.auth.JWT(credentials.client_email, null, credentials.private_key.replace(/\\n/g, '\n'), [
	'https://www.googleapis.com/auth/spreadsheets',
]);

// ♣ rendering all user ♣
exports.renderAllUser = async (req, res) => {
	try {
		const totalUsers = await User.countDocuments();
		const totalBlotter = await BlotterReport.countDocuments();
		const totalMaterialRequest = await BorrowReport.countDocuments();
		const totalCertificateRecords = await CertificateReport.countDocuments();
		const users = await User.find();
		const account = await Account.find();

		res.render('user_pages/dashboard_pages/index', {
			title: 'User Home Page',
			users: users,
			totalUsers: totalUsers,
			totalBlotter: totalBlotter,
			totalMaterialRequest: totalMaterialRequest,
			totalCertificateRecords: totalCertificateRecords,
		});
	} catch (err) {
		res.json({
			message: err.message,
		});
	}
};

// ♣ rendering citizen records ♣
exports.renderCitizen = async (req, res) => {
	try {
		const users = await User.find();
		res.render('user_pages/citizen_pages/citizen-record', { title: "User Citizens' Records", users: users });
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Viewing Citizens Records Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/');
		}
	}
};

// // ♣ add_user controller ♣
// exports.addUser = async (req, res) => {
// 	try {
// 		const existingUser = await User.findOne({ name: req.body.name });
// 		if (existingUser) {
// 			const isDuplicateName = existingUser.name.toLowerCase() === req.body.name.toLowerCase();
// 			if (isDuplicateName) {
// 				// Username already exists (even if it has different capitalization)
// 				// Update the existing user's information
// 				existingUser.name = req.body.name;
// 				existingUser.address = req.body.address;
// 				existingUser.age = req.body.age;
// 				existingUser.phone = req.body.phone;
// 				existingUser.occupation = req.body.occupation;
// 				existingUser.civilStatus = req.body.civilStatus;
// 				existingUser.birthday = req.body.birthday;
// 				existingUser.motherName = req.body.motherName;
// 				existingUser.motherAge = req.body.motherAge;
// 				existingUser.motherOccupation = req.body.motherOccupation;
// 				existingUser.fatherName = req.body.fatherName;
// 				existingUser.fatherAge = req.body.fatherAge;
// 				existingUser.fatherOccupation = req.body.fatherOccupation;
// 				await existingUser.save();
// 				req.session.message = {
// 					titleMessage: 'Warning!',
// 					type: 'warning',
// 					message: 'Duplication of information is prohibited',
// 				};
// 				return res.redirect('/citizens_record');
// 			}
// 		} else {
// 			// Create a new user only if there is data for the user
// 			await User.create({
// 				name: req.body.name,
// 				address: req.body.address,
// 				age: req.body.age,
// 				phone: req.body.phone,
// 				occupation: req.body.occupation,
// 				civilStatus: req.body.civilStatus,
// 				birthday: req.body.birthday,
// 				motherName: req.body.motherName,
// 				motherAge: req.body.motherAge,
// 				motherOccupation: req.body.motherOccupation,
// 				fatherName: req.body.fatherName,
// 				fatherAge: req.body.fatherAge,
// 				fatherOccupation: req.body.fatherOccupation,
// 			});
// 			req.session.message = {
// 				titleMessage: 'Success',
// 				type: 'success',
// 				message: 'User added successfuly ✅',
// 			};
// 		}

// 		res.redirect('/citizens_record');
// 	} catch (err) {
// 		req.session.message = {
// 			titleMessage: 'Error',
// 			type: 'error',
// 			message: 'Failed to add user. | Make sure to not add existing user. | Make sure to give proper data |',
// 		};
// 		console.log(err);
// 		res.redirect('/citizens_record');
// 	}
// };

// // ♣ add_many_user controller ♣
// exports.addManyUser = async (req, res) => {
// 	try {
// 		console.log(req.body);
// 		// Authorize the client
// 		const token = await authClient.authorize();

// 		// Set the client credentials
// 		authClient.setCredentials(token);

// 		// Get the rows
// 		const respo = await service.spreadsheets.values.get({
// 			auth: authClient,
// 			spreadsheetId: '1ra8Gyr0Z3j1dBwyV08tfpwuSBwgB42Qj0un3DNAv0Ow',
// 			range: 'A:N',
// 		});

// 		// All of the answers
// 		const answers = [];

// 		// Set rows to equal the rows
// 		const rows = respo.data.values;

// 		// Check if we have any data and if we do add it to our answers array
// 		if (rows.length) {
// 			// Remove the headers
// 			rows.shift();

// 			// For each row
// 			for (const row of rows) {
// 				const existingUser = await User.findOne({ name: row[1] });
// 				if (!existingUser) {
// 					answers.push({
// 						name: row[1],
// 						address: row[2],
// 						age: row[3],
// 						phone: row[4],
// 						occupation: row[5],
// 						civilStatus: row[6],
// 						birthday: row[7],
// 						motherName: row[8],
// 						motherAge: row[9],
// 						motherOccupation: row[10],
// 						fatherName: row[11],
// 						fatherAge: row[12],
// 						fatherOccupation: row[13],
// 						timeCreated: row[0],
// 					});
// 				}
// 			}
// 		} else {
// 			req.session.message = {
// 				titleMessage: 'Warning',
// 				type: 'warning',
// 				message: 'No data found 😓 ',
// 			};

// 			res.redirect('/citizens_record');
// 		}

// 		// Saved the answers
// 		fs.writeFile('answers.json', JSON.stringify(answers), function (err, file) {
// 			if (err) throw err;
// 			console.log('Saved!');
// 		});

// 		answers.forEach(async function (user) {
// 			const existingUser = await User.findOne({ name: user.name });
// 			if (existingUser) {
// 				// Username already exists (even if it has different capitalization)
// 				// Update the existing user's information
// 				existingUser.name = user.name;
// 				existingUser.address = user.address;
// 				existingUser.age = user.age;
// 				existingUser.phone = user.phone;
// 				existingUser.occupation = user.occupation;
// 				existingUser.civilStatus = user.civilStatus;
// 				existingUser.birthday = user.birthday;
// 				existingUser.motherName = user.motherName;
// 				existingUser.motherAge = user.motherAge;
// 				existingUser.motherOccupation = user.motherOccupation;
// 				existingUser.fatherName = user.fatherName;
// 				existingUser.fatherAge = user.fatherAge;
// 				existingUser.fatherOccupation = user.fatherOccupation;
// 				await existingUser.save();
// 				req.session.message = {
// 					titleMessage: 'Warning!',
// 					type: 'warning',
// 					message: 'Duplication of information is prohibited',
// 				};
// 				return res.redirect('/citizens_record');
// 			} else {
// 				// Create a new user only if there is data for the user
// 				await User.create({
// 					name: user.name,
// 					address: user.address,
// 					age: user.age,
// 					phone: user.phone,
// 					occupation: user.occupation,
// 					civilStatus: user.civilStatus,
// 					birthday: user.birthday,
// 					motherName: user.motherName,
// 					motherAge: user.motherAge,
// 					motherOccupation: user.motherOccupation,
// 					fatherName: user.fatherName,
// 					fatherAge: user.fatherAge,
// 					fatherOccupation: user.fatherOccupation,
// 				});
// 				req.session.message = {
// 					titleMessage: 'Success',
// 					type: 'success',
// 					message: 'User added successfuly ✅',
// 				};
// 			}
// 		});

// 		req.session.message = {
// 			titleMessage: 'Success',
// 			type: 'success',
// 			message: 'Users from google form has been added successfully ✅   ',
// 		};

// 		res.redirect('/citizens_record');

// 		// Reload the page after 2 seconds
// 		setTimeout(() => {
// 			location.reload();
// 		}, 200);
// 	} catch (err) {
// 		console.log(req.body);
// 		req.session.message = {
// 			titleMessage: 'Error',
// 			type: 'error',
// 			message: 'Failed to add user from google form. Please contact the admin ',
// 		};

// 		console.log(err);
// 		res.redirect('/citizens_record');
// 		// Exit the process with error
// 		process.exit(1);
// 	}
// };

// // ♣ render edit_user page ♣
// exports.renderEditUser = async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		const user = await User.findById(id);

// 		res.render('admin_pages/citizen_pages/edit_user', { title: 'Edit User', user: user });
// 	} catch (err) {
// 		if (err) {
// 			console.log(err);
// 			req.session.message = {
// 				titleMessage: 'Viewing Edit User Page Failed',
// 				type: 'error',
// 				message: 'Something went wrong. Please contact the admin',
// 			};
// 			res.redirect('/citizens_record');
// 		}
// 	}
// };

// // ♣ edit_user controller ♣
// exports.updateUser = async (req, res) => {
// 	try {
// 		const id = req.params.id;

// 		const existingUser = await User.findById(id);
// 		if (!existingUser) {
// 			req.session.message = {
// 				type: 'error',
// 				message: 'User not found',
// 			};
// 			return res.redirect('/citizens_record');
// 		}

// 		const {
// 			name,
// 			address,
// 			age,
// 			phone,
// 			occupation,
// 			birthday,
// 			motherName,
// 			motherAge,
// 			motherOccupation,
// 			fatherName,
// 			fatherAge,
// 			fatherOccupation,
// 			civilStatus,
// 		} = req.body;

// 		// Check for duplicate data
// 		const updatedData = {
// 			name,
// 			address,
// 			age,
// 			phone,
// 			occupation,
// 			birthday,
// 			motherName,
// 			motherAge,
// 			motherOccupation,
// 			fatherName,
// 			fatherAge,
// 			fatherOccupation,
// 		};
// 		const duplicateFields = [];
// 		for (const [key, value] of Object.entries(updatedData)) {
// 			if (value && value !== existingUser[key]) {
// 				const isDuplicate = await User.exists({ [key]: value });
// 				if (isDuplicate) {
// 					duplicateFields.push(key);
// 				}
// 			}
// 		}
// 		if (duplicateFields.length > 0) {
// 			const fields = duplicateFields.join(', ');
// 			req.session.message = {
// 				type: 'error',
// 				message: `Duplicate data found for field(s): ${fields}. Please update the information.`,
// 			};
// 			return res.redirect('/citizens_record');
// 		}

// 		// Update user data only for fields that have a value in the request body
// 		if (name) existingUser.name = name;
// 		if (address) existingUser.address = address;
// 		if (age) existingUser.age = age;
// 		if (phone) existingUser.phone = phone;
// 		if (occupation) existingUser.occupation = occupation;
// 		if (birthday) existingUser.birthday = birthday;
// 		if (motherName) existingUser.motherName = motherName;
// 		if (motherAge) existingUser.motherAge = motherAge;
// 		if (motherOccupation) existingUser.motherOccupation = motherOccupation;
// 		if (fatherName) existingUser.fatherName = fatherName;
// 		if (fatherAge) existingUser.fatherAge = fatherAge;
// 		if (fatherOccupation) existingUser.fatherOccupation = fatherOccupation;
// 		if (civilStatus) existingUser.civilStatus = civilStatus;

// 		await existingUser.save();

// 		req.session.message = {
// 			titleMessage: 'Update Success',
// 			type: 'success',
// 			message: 'User successfully updated ✅',
// 		};
// 		res.redirect('/citizens_record');
// 	} catch (err) {
// 		console.log(err);
// 		req.session.message = {
// 			type: 'error',
// 			message:
// 				'Failed to update user. There might be duplication of data || If you are certain that there is not. Please contact the admin',
// 		};
// 		res.redirect('/');
// 	}
// };

// // ♣ delete_user controller ♣
// exports.deleteUser = async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		await User.findByIdAndDelete(id);

// 		req.session.message = {
// 			titleMessage: 'Delete Success',
// 			type: 'error',
// 			message: 'User deleted Successfully ✅',
// 		};

// 		res.redirect('/citizens_record');
// 	} catch (err) {
// 		if (err) {
// 			res.json({ message: err.message });
// 		}
// 	}
// };

// ♣ render more_info page ♣
exports.moreInfo = async (req, res) => {
	try {
		let id = req.params.id;
		const user = await User.findById(id);

		res.render('user_pages/citizen_pages/more_info', { title: 'User More User Info', user: user });
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Viewing More Info Page Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/user/citizens_record');
		}
	}
};

// // ♣ render import_csv ♣
// exports.renderImportCsv = async (req, res) => {
// 	res.render('import_csv', { title: 'Import Users' });
// };

// // ♣ import_csv controller ♣
// exports.importCsv = async (req, res, next) => {
// 	try {
// 		// get the path to the uploaded CSV file
// 		const csvPath = req.file.path;
// 		const data = [];
// 		fs.createReadStream(csvPath)
// 			.pipe(csv())
// 			.on('data', function (row) {
// 				data.push(row);
// 			})
// 			.on('end', async function () {
// 				try {
// 					console.log(data);
// 					const uniqueData = [];
// 					for (let i = 0; i < data.length; i++) {
// 						const isDuplicate = await User.findOne({ name: data[i].name });
// 						if (!isDuplicate) {
// 							uniqueData.push(data[i]);
// 						}
// 					}
// 					await User.insertMany(uniqueData);
// 					// delete the uploaded file
// 					fs.unlinkSync(csvPath);

// 					// send a response to the user
// 					req.session.message = {
// 						titleMessage: 'Import Success',
// 						type: 'success',
// 						message: 'Data in the file has been successfully imported ✅ || NOTE: Duplication of data is prohibitted.',
// 					};
// 					res.redirect('/citizens_record');
// 				} catch (err) {
// 					next(err);
// 					req.session.message = {
// 						titleMessage: 'Import Failed',
// 						type: 'error',
// 						message: 'Something went wrong :( || Please contact the admin.',
// 					};
// 					console.log(err);
// 					res.redirect('/citizens_record');
// 				}
// 			});
// 	} catch (err) {
// 		if (err) {
// 			console.log(err);
// 			req.session.message = {
// 				titleMessage: 'Importing Failed',
// 				type: 'error',
// 				message: 'Something went wrong. Please contact the admin',
// 			};
// 			res.redirect('/citizens_record');
// 		}
// 	}
// };

// ♣ render give_cert controller ♣
exports.renderGiveCert = async (req, res) => {
	try {
		let id = req.params.id;
		const user = await User.findById(id);

		res.render('user_pages/citizen_pages/give_cert', {
			title: 'User Certificates',
			user: user,
		});
	} catch (err) {
		req.session.message = {
			titleMessage: 'Viewing Certificate Page Failed',
			type: 'error',
			message: 'Something went wrong. Please contact the admin',
		};
		res.redirect('/user/citizens_record');
	}
};

// // ♣  give brgy-cert controller ♣
// exports.barangayCert = async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		const user = await User.findById(id);
// 		// Load the docx file as binary content
// 		const content = fs.readFileSync(path.resolve(`${__dirname}/../../certificates/brgy-certificate.docx`), 'binary');

// 		const zip = new PizZip(content);

// 		const doc = new Docxtemplater(zip, {
// 			paragraphLoop: true,
// 			linebreaks: true,
// 		});

// 		// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
// 		doc.setData({
// 			name: user.name,
// 			age: user.age,
// 			civilStatus: user.civilStatus,
// 			occupation: user.occupation,
// 			address: user.address,
// 			day: day,
// 			month: nameMonth,
// 		});

// 		doc.render();

// 		const buf = doc.getZip().generate({
// 			type: 'nodebuffer',
// 			// compression: DEFLATE adds a compression step.
// 			// For a 50MB output document, expect 500ms additional CPU time
// 			compression: 'DEFLATE',
// 		});

// 		// Set the response header for downloading the file
// 		res.set({
// 			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 			'Content-Disposition': `attachment; filename=${user.name}-brgy-certificate.docx`,
// 		});

// 		// Send the rendered document to the client
// 		res.send(buf);
// 	} catch (err) {
// 		console.error(err);
// 		// res.status(500).send('Error generating document');
// 		if (err) {
// 			console.log(err);
// 			req.session.message = {
// 				titleMessage: 'Error Generating Document',
// 				type: 'error',
// 				message: 'Something went wrong. Please contact the admin',
// 			};
// 			res.redirect('/citizens_record');
// 		}
// 	}
// };

// // ♣ give oath controller ♣
// exports.oath = async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		const user = await User.findById(id);
// 		// Load the docx file as binary content
// 		const content = fs.readFileSync(path.resolve(`${__dirname}/../../certificates/oath-certificate.docx`), 'binary');

// 		const zip = new PizZip(content);

// 		const doc = new Docxtemplater(zip, {
// 			paragraphLoop: true,
// 			linebreaks: true,
// 		});

// 		// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
// 		doc.setData({
// 			name: user.name,
// 			age: user.age,
// 			civilStatus: user.civilStatus,
// 			address: user.address,
// 			day: day,
// 			month: nameMonth,
// 		});

// 		doc.render();

// 		const buf = doc.getZip().generate({
// 			type: 'nodebuffer',
// 			// compression: DEFLATE adds a compression step.
// 			// For a 50MB output document, expect 500ms additional CPU time
// 			compression: 'DEFLATE',
// 		});

// 		// Set the response header for downloading the file
// 		res.set({
// 			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 			'Content-Disposition': `attachment; filename=${user.name}-oath-of-undertaking.docx`,
// 		});

// 		// Send the rendered document to the client
// 		res.send(buf);
// 	} catch (err) {
// 		console.error(err);
// 		if (err) {
// 			console.log(err);
// 			req.session.message = {
// 				titleMessage: 'Error Generating Document',
// 				type: 'error',
// 				message: 'Something went wrong. Please contact the admin',
// 			};
// 			res.redirect('/citizens_record');
// 		}
// 	}
// };

// // ♣ give job-cert controller ♣
// exports.jobCert = async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		const user = await User.findById(id);
// 		// Load the docx file as binary content
// 		const content = fs.readFileSync(path.resolve(`${__dirname}/../../certificates/job-certificate.docx`), 'binary');

// 		const zip = new PizZip(content);

// 		const doc = new Docxtemplater(zip, {
// 			paragraphLoop: true,
// 			linebreaks: true,
// 		});

// 		// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
// 		doc.setData({
// 			name: user.name,
// 			age: user.age,
// 			civilStatus: user.civilStatus,
// 			address: user.address,
// 			day: day,
// 			month: nameMonth,
// 		});

// 		doc.render();

// 		const buf = doc.getZip().generate({
// 			type: 'nodebuffer',
// 			// compression: DEFLATE adds a compression step.
// 			// For a 50MB output document, expect 500ms additional CPU time
// 			compression: 'DEFLATE',
// 		});

// 		// Set the response header for downloading the file
// 		res.set({
// 			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 			'Content-Disposition': `attachment; filename=${user.name}-job-certificate.docx`,
// 		});

// 		// Send the rendered document to the client
// 		res.send(buf);
// 	} catch (err) {
// 		console.error(err);
// 		// res.status(500).send('Error generating document');
// 		if (err) {
// 			console.log(err);
// 			req.session.message = {
// 				titleMessage: 'Error Generating Document',
// 				type: 'error',
// 				message: 'Something went wrong. Please contact the admin',
// 			};
// 			res.redirect('/citizens_record');
// 		}
// 	}
// };

// // ♣ give cert-indigency controller ♣
// exports.certOfIndigency = async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		const user = await User.findById(id);
// 		// Load the docx file as binary content
// 		const content = fs.readFileSync(path.resolve(`${__dirname}/../../certificates/cert-of-indigency.docx`), 'binary');

// 		console.log(req.body.purpose);

// 		const zip = new PizZip(content);

// 		const doc = new Docxtemplater(zip, {
// 			paragraphLoop: true,
// 			linebreaks: true,
// 		});

// 		// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
// 		doc.setData({
// 			name: user.name,
// 			age: user.age,
// 			civilStatus: user.civilStatus,
// 			address: user.address,
// 			purpose: req.body.purpose,
// 			day: day,
// 			month: nameMonth,
// 		});

// 		doc.render();

// 		const buf = doc.getZip().generate({
// 			type: 'nodebuffer',
// 			// compression: DEFLATE adds a compression step.
// 			// For a 50MB output document, expect 500ms additional CPU time
// 			compression: 'DEFLATE',
// 		});

// 		// Set the response header for downloading the file
// 		res.set({
// 			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 			'Content-Disposition': `attachment; filename=${user.name}-certificate-of-indigency.docx`,
// 		});

// 		// Send the rendered document to the client
// 		res.send(buf);
// 	} catch (err) {
// 		console.error(err);
// 		// res.status(500).send('Error generating document');
// 		if (err) {
// 			console.log(err);
// 			req.session.message = {
// 				titleMessage: 'Error Generating Document',
// 				type: 'error',
// 				message: 'Something went wrong. Please contact the admin',
// 			};
// 			res.redirect('/citizens_record');
// 		}
// 	}
// };

// // ♣ give brgy-clearance controller ♣
// exports.barangayClearance = async (req, res) => {
// 	try {
// 		let id = req.params.id;
// 		const user = await User.findById(id);
// 		// Load the docx file as binary content
// 		const content = fs.readFileSync(path.resolve(`${__dirname}/../../certificates/brgy-clearance.docx`), 'binary');

// 		console.log(req.body.purpose);

// 		const zip = new PizZip(content);

// 		const doc = new Docxtemplater(zip, {
// 			paragraphLoop: true,
// 			linebreaks: true,
// 		});

// 		// Render the document (Replace {first_name} by John, {last_name} by Doe, ...)
// 		doc.setData({
// 			name: user.name.toUpperCase(),
// 			age: user.age,
// 			civilStatus: user.civilStatus,
// 			address: user.address,
// 			purpose: req.body.purpose,
// 			day: day,
// 			month: nameMonth,
// 		});

// 		doc.render();

// 		const buf = doc.getZip().generate({
// 			type: 'nodebuffer',
// 			// compression: DEFLATE adds a compression step.
// 			// For a 50MB output document, expect 500ms additional CPU time
// 			compression: 'DEFLATE',
// 		});

// 		// Set the response header for downloading the file
// 		res.set({
// 			'Content-Type': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
// 			'Content-Disposition': `attachment; filename=${user.name}-barangay-clearance.docx`,
// 		});

// 		// Send the rendered document to the client
// 		res.send(buf);
// 	} catch (err) {
// 		console.error(err);
// 		// res.status(500).send('Error generating document');
// 		if (err) {
// 			console.log(err);
// 			req.session.message = {
// 				titleMessage: 'Error Generating Document',
// 				type: 'error',
// 				message: 'Something went wrong. Please contact the admin',
// 			};
// 			res.redirect('/citizens_record');
// 		}
// 	}
// };

// ♣ render profile pic page route ♣
exports.renderProfilePic = async (req, res) => {
	try {
		let id = req.params.id;
		const user = await User.findById(id);
		res.render('user_pages/citizen_pages/profile-picture', { title: 'User Upload/Update Profile', user: user });
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Viewing Upload Profile Picture Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/user/citizens_record');
		}
	}
};

// ♣  profile pic controller ♣
exports.profilePic = async (req, res) => {
	try {
		let id = req.params.id;
		let profilePic = req.file.filename;

		const user = await User.findById(id);
		await User.findByIdAndUpdate(id, { $set: { img: profilePic } }, { new: true });

		req.session.message = {
			titleMessage: 'Upload Success',
			type: 'success',
			message: 'Uploading/Updating Profile Picutre success!',
		};

		res.redirect('/user/citizens_record');
	} catch (err) {
		if (err) {
			console.log(err);
		}
	}
};
