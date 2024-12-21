const express = require('express');
const router = express.Router();
const {
	createUser,
	deleteUser,
	getAllUsers,
	loginUser,
	updateUserStatus,
	getUserStatus,
	getUserDetails,
} = require('../controllers/userController');

// Create a new user
router.post('/create', createUser);




// Delete a user by ID
router.delete('/:id', deleteUser);

// Get all users
router.get('/', getAllUsers);

// Login a user
router.post('/login', loginUser);

// Update user status by ID
router.put('/status/:id', updateUserStatus);

// Get user status (using JWT token)
router.get('/status', getUserStatus);

// Get user details by ID
router.get('/:id', getUserDetails);

module.exports = router;
