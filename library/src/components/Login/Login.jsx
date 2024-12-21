import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import 'antd/dist/reset.css'; // Import Ant Design styles

const Login = () => {
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const openNotification = (type, message) => {
		notification[type]({
			message: type === 'success' ? 'Success' : 'Error',
			description: message,
		});
	};

	const handleLogin = async (values) => {
		try {
			const response = await fetch(
				'http://localhost:5000/api/user/login',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(values),
				}
			);

			const data = await response.json();
			if (response.ok) {
				localStorage.setItem('token', data.token); // Store JWT token
				localStorage.setItem('role', data.role); // Store user role
				openNotification('success', 'Login successful!');
				navigate('/about'); // Redirect to the dashboard page
			} else {
				setError(data.message);
				openNotification('error', data.message);
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
			openNotification('error', 'An error occurred. Please try again.');
		}
	};

	return (
		<div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
			<h2>Login</h2>
			<Form
				layout="vertical"
				onFinish={handleLogin}
				initialValues={{ email: '', password: '' }}
			>
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: 'Please enter your email' },
					]}
				>
					<Input type="email" />
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: 'Please enter your password',
						},
					]}
				>
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{
							backgroundColor: '#6a0dad',
							borderColor: '#6a0dad',
						}} // Custom purple color
					>
						Login
					</Button>
				</Form.Item>
				{error && <p style={{ color: 'red' }}>{error}</p>}
			</Form>
		</div>
	);
};

export default Login;
