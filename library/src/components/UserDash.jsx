import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Typography, notification } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

const { Title } = Typography;

const UserDash = () => {
	const [books, setBooks] = useState([]);

	// Fetch user's pending books
	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(
					'http://localhost:5000/api/books/books/pending',
					{
						headers: {
							Authorization: `Bearer ${token}`, // Ensure Bearer prefix
						},
					}
				);
				// Assuming the books have the status field as 'Pending'
				setBooks(response.data);
			} catch (error) {
				notification.error({
					message: 'Error',
					description: 'Failed to load your pending books.',
				});
			}
		};

		fetchBooks();
	}, []);

	// Define table columns
	const columns = [
		{
			title: 'Title',
			dataIndex: 'title',
			key: 'title',
		},
		{
			title: 'Author',
			dataIndex: 'author',
			key: 'author',
		},
		{
			title: 'Submitted At',
			dataIndex: 'submittedAt',
			key: 'submittedAt',
			render: (text) => new Date(text).toLocaleString(),
		},
		{
			title: 'Status',
			key: 'status',
			dataIndex: 'status',
			render: (status) => {
				if (status === 'Pending') {
					return (
						<span style={{ color: '#faad14' }}>
							<CloseCircleOutlined /> Pending
						</span>
					);
				} else {
					return (
						<span style={{ color: '#52c41a' }}>
							<CheckCircleOutlined /> Pending
						</span>
					);
				}
			},
		},
	];

	return (
		<div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
			<Title level={2}>Your Pending Books</Title>
			<Table
				dataSource={books}
				columns={columns}
				rowKey="_id"
				pagination={false} 
			/>
		</div>
	);
};

export default UserDash;
