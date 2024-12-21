import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Form, Upload, notification } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';

const AddBook = () => {
	const [title, setTitle] = useState('');
	const [author, setAuthor] = useState('');
	const [isbn, setIsbn] = useState(''); // Add ISBN state
	const [photo, setPhoto] = useState(null);

	const openNotification = (type, message) => {
		notification[type]({
			message: type === 'success' ? 'Success' : 'Error',
			description: message,
			duration: 3,
		});
	};

	const handleSubmit = async (values) => {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('author', values.author);
		formData.append('isbn', values.isbn); // Add ISBN to form data
		if (photo) {
			formData.append('photo', photo);
		}

		try {
			const token = localStorage.getItem('token');
			await axios.post(
				'http://localhost:5000/api/books/addbook',
				formData,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);
			openNotification(
				'success',
				'Your book is pending approval by an admin.'
			);
			setTitle('');
			setAuthor('');
			setIsbn(''); // Clear ISBN input
			setPhoto(null);
		} catch (error) {
			openNotification(
				'error',
				error.response?.data?.message || 'Server error'
			);
		}
	};

	const handleFileChange = (file) => {
		setPhoto(file);
		return false;
	};

	return (
		<div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
			<h2>Add New Book</h2>
			<Form layout="vertical" onFinish={handleSubmit}>
				<Form.Item
					label="Title"
					name="title"
					rules={[
						{ required: true, message: 'Please enter the title' },
					]}
				>
					<Input
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label="Author"
					name="author"
					rules={[
						{ required: true, message: 'Please enter the author' },
					]}
				>
					<Input
						value={author}
						onChange={(e) => setAuthor(e.target.value)}
					/>
				</Form.Item>
				<Form.Item
					label="ISBN"
					name="isbn"
					rules={[
						{ required: true, message: 'Please enter the ISBN' },
					]}
				>
					<Input
						value={isbn}
						onChange={(e) => setIsbn(e.target.value)}
					/>
				</Form.Item>
				<Form.Item label="Cover Image" name="photo">
					<Upload
						customRequest={({ file, onSuccess }) => {
							handleFileChange(file);
							onSuccess();
						}}
						showUploadList={false}
						accept="image/jpeg,image/png,image/gif"
					>
						<Button icon={<UploadOutlined />}>
							Upload Cover Image
						</Button>
					</Upload>
				</Form.Item>
				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						style={{
							backgroundColor: '#6a0dad',
							borderColor: '#6a0dad',
						}}
					>
						Add Book
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default AddBook;
