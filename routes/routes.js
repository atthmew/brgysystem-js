// imports
const express = require('express');
const router = express.Router();
const User = require('../model/userModel');

// admin
const userController = require('../controller/admin_controller/userController');
const reportController = require('../controller/admin_controller/reportController');
const borrowerController = require('../controller/admin_controller/borrowerController');
const loginController = require('../controller/admin_controller/loginController');
const recordsController = require('../controller/admin_controller/recordsController');

// users
const userControllerUser = require('../controller/user_controller/userController');
const reportControllerUser = require('../controller/user_controller/reportController');
const borrowerControllerUser = require('../controller/user_controller/borrowerController');
const recordsControllerUser = require('../controller/user_controller/recordsController');

const { reset } = require('nodemon');
const swal = require('sweetalert');
const multer = require('multer');
const { requireAuth } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

// image upload
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, './views/img/profilePics');
	},
	filename: function (req, file, cb) {
		cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
	},
});

// middleware for image upload
var uploadPic = multer({
	storage: storage,
}).single('image');

const upload = multer({ dest: 'uploads/' });

// NOTE: put a requireAuth middleware on all routers

// Checking the role
function checkRole(role) {
	return function (req, res, next) {
		if (req.user && req.user.role === role) {
			next();
		} else {
			console.log('access denied');
		}
	};
}

// ♣ ADMIN PAGES ♣

// ♥ RECORDS ♥
// render citizen records route
router.get('/records_material', requireAuth, recordsController.renderMaterialRecordsPage);
router.get('/records_blotter', requireAuth, recordsController.renderBlotterRecordsPage);
router.get('/records_certificate', requireAuth, recordsController.renderCertificateRecordsPage);

// download borrow report
router.post('/records_material/download', requireAuth, recordsController.downloadMaterialReport);
// download cert report
router.post('/records_cert/download', requireAuth, recordsController.downdloadCertReport);
// download blotter report
router.post('/records_blotter/download', requireAuth, recordsController.downdloadBlotterReport);

// ♥ USERS ♥
// render all users route
router.get('/', requireAuth, userController.renderAllUser);

// render citizens route
router.get('/citizens_record', requireAuth, userController.renderCitizen);

// posting add_user
router.post('/add', userController.addUser);

// posting add_many_user
router.post('/add_many_user', userController.addManyUser);

// render edit_user route
router.get('/edit/:id', userController.renderEditUser);
// edit_user userController
router.post('/update/:id', userController.updateUser);

// delete_user userController
router.get('/delete/:id', userController.deleteUser);

// render more_info route
router.get('/more_info/:id', userController.moreInfo);

// import_csv userController
router.post('/upload', upload.single('csvFile'), userController.importCsv);

// render give_cert route
router.get('/give_cert/:id', userController.renderGiveCert);

//give brgy-cert userController
router.post('/brgy-cert/:id', userController.barangayCert);

//give oath userController
router.post('/oath/:id', userController.oath);

//give job-cert userController
router.post('/job-cert/:id', userController.jobCert);

//give cert-indigency userController
router.post('/cert-indigency/:id', userController.certOfIndigency);

//give brgy-clearance userController
router.post('/brgy-clearance/:id', userController.barangayClearance);

//render profile_pic page userController
router.get('/profile_pic/:id', userController.renderProfilePic);

//profile_pic controller
router.post('/add-pic/:id', uploadPic, userController.profilePic);

// ♥ REPORTS ♥
// render report_user route
router.get('/report/:id', reportController.renderReportUser);

// report_user userController
router.post('/report/:id', reportController.reportUser);

// render report page route
router.get('/view_report', requireAuth, reportController.renderReports);

// mark as done report
router.post('/mark_done/:id', reportController.doneReport);

// mark as done report
router.get('/mark_done_view/:id', reportController.doneReportConfirmation);

// render more_info_report page
router.get('/more_info_report/:id', reportController.renderMoreInfoReport);

// ♥ BORRWOW ♥
// render borrowers_record
router.get('/borrower_record', requireAuth, borrowerController.renderBorrowRecord);

// render lend_material page
router.get('/lend_material/:id', borrowerController.renderLendMaterial);

// lend_material route
router.post('/lend_material/:id', borrowerController.lendMaterial);

// render confirmation in mark as returned
router.get('/mark_returned/:id', borrowerController.markAsReturnedConfirmation);
//  confirmation in mark as returned controller
router.post('/mark_returned/:id', borrowerController.markAsReturnedController);

// render more info borrow
router.get('/more_info_borrow/:id', borrowerController.renderMoreInfoBorrow);

// ♥ LOGIN ♥
// render signup page
router.get('/signup', loginController.renderSignUp);

// render login page
router.get('/login', loginController.renderLogin);

// sign up router
router.post('/signup', loginController.signUp);

// login router
router.post('/login', loginController.logIn);

// logout router
router.get('/logout', loginController.logOut);

// ♣ USER PAGES ♣

// ♥ RECORDS ♥
// render citizen records route
router.get('/user/records_material', requireAuth, recordsControllerUser.renderMaterialRecordsPage);
router.get('/user/records_blotter', requireAuth, recordsControllerUser.renderBlotterRecordsPage);
router.get('/user/records_certificate', requireAuth, recordsControllerUser.renderCertificateRecordsPage);

// ♥ USERS ♥
// render all users route
router.get('/user', requireAuth, userControllerUser.renderAllUser);

// render citizens route
router.get('/user/citizens_record', requireAuth, userControllerUser.renderCitizen);

// // posting add_user
// router.post('/add', userController.addUser);

// // posting add_many_user
// router.post('/add_many_user', userController.addManyUser);

// // render edit_user route
// router.get('/edit/:id', userController.renderEditUser);
// // edit_user userController
// router.post('/update/:id', userController.updateUser);

// // delete_user userController
// router.get('/delete/:id', userController.deleteUser);

// render more_info route
router.get('/user/more_info/:id', userControllerUser.moreInfo);

// // import_csv userController
// router.post('/upload', upload.single('csvFile'), userController.importCsv);

// render give_cert route
router.get('/user/give_cert/:id', userControllerUser.renderGiveCert);

// //give brgy-cert userController
// router.post('/brgy-cert/:id', userController.barangayCert);

// //give oath userController
// router.post('/oath/:id', userController.oath);

// //give job-cert userController
// router.post('/job-cert/:id', userController.jobCert);

// //give cert-indigency userController
// router.post('/cert-indigency/:id', userController.certOfIndigency);

// //give brgy-clearance userController
// router.post('/brgy-clearance/:id', userController.barangayClearance);

//render profile_pic page userController
router.get('/user/profile_pic/:id', userControllerUser.renderProfilePic);

//profile_pic controller
router.post('/user/add-pic/:id', uploadPic, userControllerUser.profilePic);

// // ♥ REPORTS ♥

// render report page route
router.get('/user/view_report', requireAuth, reportControllerUser.renderReports);

// render report_user route
router.get('/user/report/:id', reportControllerUser.renderReportUser);

// report_user userController
router.post('/user/report/:id', reportControllerUser.reportUser);

// mark as done report
router.post('/user/mark_done/:id', reportControllerUser.doneReport);

// mark as done report
router.get('/user/mark_done_view/:id', reportControllerUser.doneReportConfirmation);

// render more_info_report page
router.get('/user/more_info_report/:id', reportControllerUser.renderMoreInfoReport);

// // ♥ BORRWOW ♥
// render borrowers_record
router.get('/user/borrower_record', requireAuth, borrowerControllerUser.renderBorrowRecord);

// render lend_material page
router.get('/user/lend_material/:id', borrowerControllerUser.renderLendMaterial);

// lend_material route
router.post('/user/lend_material/:id', borrowerControllerUser.lendMaterial);

// render confirmation in mark as returned
router.get('/user/mark_returned/:id', borrowerControllerUser.markAsReturnedConfirmation);

//  confirmation in mark as returned controller
router.post('/user/mark_returned/:id', borrowerControllerUser.markAsReturnedController);

// render more info borrow
router.get('/user/more_info_borrow/:id', borrowerControllerUser.renderMoreInfoBorrow);

// // ♥ LOGIN ♥
// // render signup page
// router.get('/signup', loginController.renderSignUp);

// // render login page
// router.get('/login', loginController.renderLogin);

// // sign up router
// router.post('/signup', loginController.signUp);

// // login router
// router.post('/login', loginController.logIn);

// // logout router
// router.get('/logout', loginController.logOut);

module.exports = router;
