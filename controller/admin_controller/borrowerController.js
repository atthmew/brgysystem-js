const User = require('../../model/userModel');
const Report = require('../../model/blotterModel');
const Borrower = require('../../model/borrowerModel');
const BorrowReport = require('../../model/borrowerReportModel');

// ♣ rendering all user ♣
exports.renderBorrowRecord = async (req, res) => {
	try {
		// const borrower = await Borrower.find();
		const borrower = await Borrower.find();
		res.render('admin_pages/borrow_pages/borrowers_record', {
			title: "Borrowers' Record",
			borrower: borrower,
			// borrower: borrower,
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

// ♣ rendering lend_materials page ♣
exports.renderLendMaterial = async (req, res) => {
	try {
		// const borrower = await Borrower.find();
		let id = req.params.id;
		const borrower = await Borrower.find();
		const user = await User.findById(id);

		res.render('admin_pages/borrow_pages/lend_material', {
			title: 'Lend Material Page',
			borrower: borrower,
			user: user,
		});
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Rendering all Lending Page Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/');
		}
	}
};

// ♣ lend material controller ♣
exports.lendMaterial = async (req, res) => {
	try {
		let id = req.params.id;
		const user = await User.findById(id);
		const borrow = await Borrower.find();

		await Borrower.create({
			borrowImg: user.img,
			borrowName: user.name,
			borrowAddress: user.address,
			borrowPhone: user.phone,
			borrowAge: user.age,
			borrowBirthday: user.birthday,
			itemName: req.body.itemName,
			itemQuantity: req.body.itemQuantity,
			borrowReason: req.body.borrowReason,
		});

		await BorrowReport.create({
			borrowReportId: id,
			borrowReportName: user.name,
			borrowReportAddress: user.address,
			borrowReportPhone: user.phone,
			borrowReportItemBorrowed: req.body.itemName,
			borrowReportItemQuantity: req.body.itemQuantity,
			borrowReportReason: req.body.borrowReason,
			img: user.img,
		});

		req.session.message = {
			titleMessage: 'Lending Material Success',
			type: 'success',
			message: 'successfully lend ✅ ',
		};
		res.redirect('/borrower_record');
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Oh no...',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/');
		}
	}
};

// ♣  mark as returned controller ♣
exports.markAsReturnedConfirmation = async (req, res) => {
	try {
		let id = req.params.id;
		const borrower = await Borrower.findById(id);

		res.render('admin_pages/borrow_pages/returnedConfirmation', {
			title: 'Confirmation',
			borrower: borrower,
		});
	} catch (err) {
		if (err) {
			req.session.message = {
				titleMessage: 'Visiting Confirmation Page Failed',
				type: 'error',
				message: 'Something went wrong. Please Contact the Admin',
			};

			res.redirect('/borrower_record');
		}
	}
};

// ♣  mark as returned confirmation ♣
exports.markAsReturnedController = async (req, res) => {
	try {
		let id = req.params.id;
		await Borrower.findByIdAndDelete(id);

		req.session.message = {
			titleMessage: 'Materials Returned ✅',
			type: 'success',
			message: 'Borrowed Material was successfuly mark as done!',
		};

		res.redirect('/borrower_record');
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Mark as returned Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/borrower_record');
		}
	}
};

// ♣  render more_info_borrow page ♣
exports.renderMoreInfoBorrow = async (req, res) => {
	try {
		let id = req.params.id;
		const borrow = await Borrower.findById(id);
		res.render('admin_pages/borrow_pages/more_info_borrow', { title: 'More Info about Borrower Page', borrow: borrow });
	} catch (err) {
		if (err) {
			console.log(err);
			req.session.message = {
				titleMessage: 'Viewing More Info about Borrower Page Failed',
				type: 'error',
				message: 'Something went wrong. Please contact the admin',
			};
			res.redirect('/');
		}
	}
};
