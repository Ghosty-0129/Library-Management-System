const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// Create a new user
exports.createUser = async (req, res) => {
	try {
		const { firstName, lastName, email, password, role, status = 'Active' } = req.body;

		if (!firstName || !lastName || !email || !password || !role) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'Email already exists' });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
			role,
			status,
		});

		await newUser.save();

		res.status(201).json({
			message: 'User created successfully',
			user: newUser,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};
// Delete a user by ID
exports.deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		const deletedUser = await User.findByIdAndDelete(id);

		if (!deletedUser) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({
			message: 'User deleted successfully',
			user: deletedUser,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

// Get all users
exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find();

		res.status(200).json({ users });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

// Login a user
exports.loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: 'Email and password are required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: 'Invalid email or password' });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: 'Invalid email or password' });
		}

		const token = jwt.sign(
			{
				id: user._id,
				email: user.email,
				role: user.role,
				status: user.status,
			},
			'your_jwt_secret_key',
			{ expiresIn: '1h' }
		);

		res.status(200).json({
			message: 'Login successful',
			token,
			userId: user._id,
			role: user.role,
			status: user.status,
			fullName: `${user.firstName} ${user.lastName}`,
			email: user.email,
		});
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

// Update User Status
exports.updateUserStatus = async (req, res) => {
	const { id } = req.params;
	const { status } = req.body;

	if (!status || typeof status !== 'string') {
		return res
			.status(400)
			.json({
				message:
					'Invalid status value. Status must be a non-empty string.',
			});
	}

	try {
		const user = await User.findByIdAndUpdate(
			id,
			{ status },
			{ new: true, runValidators: true }
		);

		if (!user) {
			return res.status(404).json({ message: 'User not found.' });
		}

		res.status(200).json({
			message: 'User status updated successfully.',
			user,
		});
	} catch (error) {
		res.status(500).json({
			message: 'An error occurred while updating user status.',
			error,
		});
	}
};

// Get User Status
exports.getUserStatus = async (req, res) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, 'your_jwt_secret_key');
		const userId = decodedToken.id;

		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json({ status: user.status });
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};

// Get User Details
exports.getUserDetails = async (req, res) => {
	try {
		const userId = req.params.id;
		const user = await User.findById(userId);

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		res.status(200).json(user);
	} catch (error) {
		res.status(500).json({ message: 'Server error', error });
	}
};
