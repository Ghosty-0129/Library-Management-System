const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true, // Ensure email is unique
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ['user', 'admin'],
		default: 'user',
	},
	adminRequestPending: {
		type: Boolean,
		default: false,
	},
	status: {
		type: String,
		default: 'Active',
	},

	avatar: {
		type: String,
		default: '', // Assuming you have a default path for avatars
	},
});

const User = mongoose.model('users', userSchema);

module.exports = User;
