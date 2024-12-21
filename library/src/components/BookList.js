import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Typography, notification, Image, List, Divider } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import Ant Design styles

const { Title, Text } = Typography;

const BookList = () => {
	const [books, setBooks] = useState([]);
	const [message, setMessage] = useState('');
	const [currentPage, setCurrentPage] = useState(1); // State to track the current page
	const [pageSize] = useState(5); // Set page size to 5

	useEffect(() => {
		const fetchBooks = async () => {
			try {
				const response = await axios.get(
					'http://localhost:5000/api/books/books'
				);
				setBooks(response.data);
			} catch (error) {
				setMessage(
					'Error fetching books: ' +
						(error.response?.data?.error || 'Server error')
				);
			}
		};
		fetchBooks();
	}, []);

	const handleBorrow = async (id) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios.put(
				`http://localhost:5000/api/books/books/borrow/${id}`,
				{},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setBooks(
				books.map((book) =>
					book._id === id ? { ...book, isBorrowed: true } : book
				)
			);
			notification.success({
				message: 'Success',
				description: response.data.message,
			});
		} catch (error) {
			notification.error({
				message: 'Error',
				description:
					'Error borrowing book: ' +
					(error.response?.data?.error || 'Server error'),
			});
		}
	};

	const handlePageChange = (page) => {
		setCurrentPage(page); // Update the current page when pagination is changed
	};

	return (
		<div
			className="book-list-container"
			style={{ padding: '20px', backgroundColor: '#f9f9f9' }}
		>
			<Title level={2}>Book List</Title>
			{message && <Text type="danger">{message}</Text>}
			<List
				dataSource={books}
				renderItem={(book) => (
					<List.Item
						style={{
							display: 'flex',
							alignItems: 'center',
							marginBottom: '16px',
							backgroundColor: '#fff',
							borderRadius: '4px',
							boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
							padding: '16px',
						}}
						key={book._id}
					>
						{book.coverImage ? (
							<Image
								width={100}
								src={`http://localhost:5000${book.coverImage}`}
								alt={book.title}
								style={{ borderRadius: '4px' }}
							/>
						) : (
							<div
								style={{
									width: '100px',
									height: '150px',
									background: '#eee',
									borderRadius: '4px',
								}}
							/>
						)}
						<div style={{ marginLeft: '16px', flex: 1 }}>
							<Text strong>{book.title}</Text> by{' '}
							<Text>{book.author}</Text>
						</div>
						<div style={{ marginLeft: 'auto' }}>
							{!book.isBorrowed ? (
								<Button
									type="primary"
									size="small"
									onClick={() => handleBorrow(book._id)}
									style={{
										backgroundColor: '#6a0dad',
										borderColor: '#6a0dad',
									}}
								>
									Borrow
								</Button>
							) : (
								<Text
									type="secondary"
									icon={<CheckCircleOutlined />}
									style={{ color: '#52c41a' }}
								>
									Borrowed
								</Text>
							)}
						</div>
					</List.Item>
				)}
				pagination={{
					current: currentPage,
					pageSize: pageSize,
					total: books.length,
					onChange: handlePageChange,
				}}
			/>
			<Divider />
		</div>
	);
};

export default BookList;
