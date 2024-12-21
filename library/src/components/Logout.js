import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';

const Logout = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Clear user data from localStorage
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
		localStorage.removeItem('role');

		// Notify the user
		message.success('You have been logged out.');

		// Redirect to the login page or home page
		navigate('/login');
	};

	return (
		<Button type="default" onClick={handleLogout}>
			Logout
		</Button>
	);
};

export default Logout;
