import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Button, notification } from 'antd';

const AdminApproval = () => {
	const [pendingBooks, setPendingBooks] = useState([]);

	useEffect(() => {
		const fetchPendingBooks = async () => {
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
				setPendingBooks(response.data);
			} catch (error) {
				notification.error({
					message: 'Error',
					description: 'Failed to load pending books.',
				});
			}
		};

		fetchPendingBooks();
	}, []);

	const handleApprove = async (bookId) => {
		try {
			const token = localStorage.getItem('token');
			await axios.put(
				`http://localhost:5000/api/books/approve/${bookId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`, // Ensure Bearer prefix
					},
				}
			);
			setPendingBooks((prev) =>
				prev.filter((book) => book._id !== bookId)
			);
			notification.success({
				message: 'Success',
				description: 'Book approved successfully.',
			});
		} catch (error) {
			notification.error({
				message: 'Error',
				description: 'Failed to approve book.',
			});
		}
	};

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
			title: 'Submitted By',
			dataIndex: 'submittedBy',
			key: 'submittedBy',
		},
		{
			title: 'Submitted At',
			dataIndex: 'submittedAt',
			key: 'submittedAt',
			render: (text) => new Date(text).toLocaleString(), // Format the date/time
		},
		{
			title: 'Action',
			key: 'action',
			render: (_, record) => (
				<Button
					type="primary"
					onClick={() => handleApprove(record._id)}
				>
					Approve
				</Button>
			),
		},
	];

	return (
		<div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
			<h2>Admin Approval</h2>
			<Table dataSource={pendingBooks} columns={columns} rowKey="_id" />
		</div>
	);
};

export default AdminApproval;
