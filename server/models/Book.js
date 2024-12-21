const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
	title: String,
	author: String,
	coverImage: String,
	approved: { type: Boolean, default: false },
	submittedBy: String, // User email or name
	submittedAt: { type: Date, default: Date.now }, // Submission date and time
});

module.exports = mongoose.model('Book', bookSchema);
