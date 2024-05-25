const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},

	address: {
		type: String,
		default: 'Tondo Manila',
	},

	age: {
		type: Number,
		required: [true, 'Age is required'],
	},

	phone: {
		type: Number,
		default: 0,
	},

	occupation: {
		type: String,
		default: 'N/A',
	},

	civilStatus: {
		type: String,
		default: 'Single',
	},

	birthday: {
		required: true,
		type: String,
	},

	motherName: {
		type: String,
		default: 'N/A',
	},

	motherAge: {
		type: String,
		default: 'N/A',
	},

	motherOccupation: {
		type: String,
		default: 'N/A',
	},

	fatherName: {
		type: String,
		default: 'N/A',
	},

	fatherAge: {
		type: String,
		default: 'N/A',
	},

	fatherOccupation: {
		type: String,
		default: 'N/A',
	},

	img: {
		type: String,
		default: 'people.png',
	},

	timeCreated: {
		type: Date,
		// required: [true, 'Date is required'],
		default: Date.now(),
	},
});

module.exports = mongoose.model('User', userSchema);
