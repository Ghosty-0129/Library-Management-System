const express = require('express');
const {
	addBook,
	getAllBooks,
	borrowBook,
	approveBook,
	getPendingBooks,
} = require('../controllers/bookController');

const router = express.Router();

// Route to add a new book (no authentication)
router.post('/addbook', addBook);

// Route to get all books
router.get('/books', getAllBooks);

// Route to get pending books (for admin, no authentication)
router.get('/books/pending', getPendingBooks);

// Route to borrow a book (no authentication)
router.put('/books/borrow/:id', borrowBook);

// Route to approve a book (no authentication)
router.put('/approve/:bookId', approveBook);

module.exports = router;
