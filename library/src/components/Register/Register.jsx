// src/components/Register/Register.jsx
import React, { useState } from 'react';
import {
	Card,
	Form,
	Input,
	Typography,
	Row,
	Col,
	Button,
	Alert,
	Spin,
	Select,
} from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title, Text } = Typography;

const Register = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState('');
	const navigate = useNavigate();

	const handleRegister = async (values) => {
		setLoading(true);
		setError(null);
		setSuccessMessage('');

		try {
			const { firstName, lastName, email, password, role } = values;
			await axios.post('http://localhost:5000/api/user/create', {
				firstName,
				lastName,
				email,
				password,
				role,
			});
			setSuccessMessage('User registered successfully!');
			setTimeout(() => navigate('/login'), 2000);
		} catch (err) {
			setError(
				err.response
					? err.response.data.message
					: 'Failed to register user. Please try again.'
			);
		}

		setLoading(false);
	};

	return (
		<div style={{ padding: '24px', maxWidth: '600px', margin: '0 auto' }}>
			<Card>
				<Row justify="center">
					<Col span={24}>
						<Title level={3} style={{ textAlign: 'center' }}>
							Create an Account
						</Title>
						<Text
							type="secondary"
							style={{
								display: 'block',
								textAlign: 'center',
								marginBottom: '16px',
							}}
						>
							Join for exclusive access!
						</Text>
						{loading && (
							<Spin
								size="large"
								style={{
									display: 'block',
									textAlign: 'center',
								}}
							/>
						)}
						{error && (
							<Alert
								message={error}
								type="error"
								showIcon
								style={{ marginBottom: '16px' }}
							/>
						)}
						{successMessage && (
							<Alert
								message={successMessage}
								type="success"
								showIcon
								style={{ marginBottom: '16px' }}
							/>
						)}
						<Form
							layout="vertical"
							onFinish={handleRegister}
							autoComplete="off"
						>
							<Form.Item
								label="First Name"
								name="firstName"
								rules={[
									{
										required: true,
										message: 'Please input your first name',
									},
								]}
							>
								<Input placeholder="Enter your first name" />
							</Form.Item>
							<Form.Item
								label="Last Name"
								name="lastName"
								rules={[
									{
										required: true,
										message: 'Please input your last name',
									},
								]}
							>
								<Input placeholder="Enter your last name" />
							</Form.Item>
							<Form.Item
								label="Email"
								name="email"
								rules={[
									{
										required: true,
										message: 'Please input your email',
									},
									{
										type: 'email',
										message:
											'Please enter a valid email address',
									},
								]}
							>
								<Input placeholder="Enter your email" />
							</Form.Item>
							<Form.Item
								label="Password"
								name="password"
								rules={[
									{
										required: true,
										message: 'Please input your password',
									},
								]}
							>
								<Input.Password placeholder="Enter your password" />
							</Form.Item>
							<Form.Item
								label="Re-enter Password"
								name="confirmPassword"
								dependencies={['password']}
								rules={[
									{
										required: true,
										message: 'Please confirm your password',
									},
									({ getFieldValue }) => ({
										validator(_, value) {
											if (
												!value ||
												getFieldValue('password') ===
													value
											) {
												return Promise.resolve();
											}
											return Promise.reject(
												'The two passwords do not match!'
											);
										},
									}),
								]}
							>
								<Input.Password placeholder="Re-enter your password" />
							</Form.Item>
							<Form.Item
								label="Role"
								name="role"
								rules={[
									{
										required: true,
										message: 'Please select a role',
									},
								]}
							>
								<Select placeholder="Select a role">
									<Option value="user">User</Option>
									<Option value="admin">Admin</Option>
								</Select>
							</Form.Item>
							<Form.Item>
								<Button
									type="primary"
									htmlType="submit"
									block
									style={{
										backgroundColor: '#6a0dad',
										borderColor: '#6a0dad',
									}}
								>
									Create Account
								</Button>
							</Form.Item>
						</Form>
					</Col>
				</Row>
			</Card>
		</div>
	);
};

export default Register;
