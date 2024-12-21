const Book = require('../models/Book');
const multer = require('multer');
const path = require('path');

// Configure Multer storage
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, path.join(__dirname, '../uploads'));
	},
	filename: (req, file, cb) => {
		cb(
			null,
			file.fieldname + '-' + Date.now() + path.extname(file.originalname)
		);
	},
});

// Initialize upload
const upload = multer({
	storage: storage,
	limits: { fileSize: 1000000 }, // 1MB limit
	fileFilter: (req, file, cb) => {
		checkFileType(file, cb);
	},
}).single('photo');

// Check file type function
function checkFileType(file, cb) {
	const filetypes = /jpeg|jpg|png|gif/;
	const extname = filetypes.test(
		path.extname(file.originalname).toLowerCase()
	);
	const mimetype = filetypes.test(file.mimetype);

	if (mimetype && extname) {
		return cb(null, true);
	} else {
		cb('Error: Images Only!');
	}
}

const addBook = async (req, res) => {
	upload(req, res, async (err) => {
		if (err) {
			return res.status(400).json({ message: err });
		}

		const { title, author, isbn, submittedBy } = req.body; // Add ISBN here
		let coverImagePath = '';
		if (req.file) {
			coverImagePath = `/uploads/${req.file.filename}`;
		}

		if (!title || !author || !isbn) {
			// Check for ISBN
			return res.status(400).json({
				message: 'Title, author, and ISBN are required',
			});
		}

		try {
			const newBook = new Book({
				title,
				author,
				isbn, // Add ISBN to the new book
				coverImage: coverImagePath,
				approved: false,
				submittedBy,
				submittedAt: new Date(),
			});

			await newBook.save();
			res.status(201).json({
				message: 'Book submitted for approval successfully',
				book: newBook,
			});
		} catch (error) {
			console.error('Error adding book:', error.message);
			res.status(500).json({ message: 'Server error' });
		}
	});
};

const approveBook = async (req, res) => {
	const { bookId } = req.params;

	try {
		const book = await Book.findById(bookId);
		if (!book) {
			return res.status(404).json({ message: 'Book not found' });
		}

		book.approved = true;
		await book.save();

		res.status(200).json({
			message: 'Book approved successfully',
			book,
		});
	} catch (error) {
		console.error('Error approving book:', error.message);
		res.status(500).json({ message: 'Server error' });
	}
};

const getAllBooks = async (req, res) => {
	try {
		const books = await Book.find({ approved: true }); // Fetch only approved books
		res.json(books);
	} catch (err) {
		console.error('Error fetching books:', err.message);
		res.status(500).json({ error: err.message });
	}
};

const borrowBook = async (req, res) => {
	const { id } = req.params;

	try {
		const book = await Book.findById(id);
		if (!book) return res.status(404).json({ error: 'Book not found' });
		if (book.isBorrowed)
			return res.status(400).json({ error: 'Book already borrowed' });

		book.isBorrowed = true;
		await book.save();
		res.json({ message: 'Book borrowed successfully' });
	} catch (err) {
		console.error('Error borrowing book:', err.message);
		res.status(500).json({ error: err.message });
	}
};

// Get pending books for admin
const getPendingBooks = async (req, res) => {
	try {
		const books = await Book.find({ approved: false });
		res.json(books);
	} catch (err) {
		console.error('Error fetching pending books:', err.message);
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	addBook,
	getAllBooks,
	borrowBook,
	approveBook,
	getPendingBooks,
};
