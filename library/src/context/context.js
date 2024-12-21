import React, { useState, useContext, useEffect, useCallback } from 'react';

const URL = 'http://openlibrary.org/search.json?title=';
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState('the lost world');
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(false);
	const [resultTitle, setResultTitle] = useState('');

	const fetchBooks = useCallback(async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`${URL}${encodeURIComponent(searchTerm)}`
			);
			const data = await response.json();
			const { docs } = data;

			if (Array.isArray(docs)) {
				const newBooks = docs.slice(0, 20).map((bookSingle) => {
					const {
						key,
						author_name,
						cover_i,
						edition_count,
						first_publish_year,
						title,
					} = bookSingle;

					return {
						id: key,
						author: author_name
							? author_name.join(', ')
							: 'Unknown',
						cover_id: cover_i,
						edition_count: edition_count || 'N/A',
						first_publish_year: first_publish_year || 'N/A',
						title: title || 'No Title',
					};
				});

				setBooks(newBooks);
				setResultTitle(
					newBooks.length
						? 'Your Search Results'
						: 'No Search Result Found!'
				);
			} else {
				setBooks([]);
				setResultTitle('No Search Result Found!');
			}
		} catch (error) {
			console.error('Failed to fetch books:', error);
			setBooks([]);
			setResultTitle('Error fetching data');
		} finally {
			setLoading(false);
		}
	}, [searchTerm]);

	useEffect(() => {
		fetchBooks();
	}, [searchTerm, fetchBooks]);

	return (
		<AppContext.Provider
			value={{
				loading,
				books,
				setSearchTerm,
				resultTitle,
				setResultTitle,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useGlobalContext = () => {
	return useContext(AppContext);
};

export { AppContext, AppProvider };
