import React, { useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import './SearchForm.css';

const SearchForm = () => {
	const { setSearchTerm, setResultTitle } = useGlobalContext();
	const searchText = useRef(null);
	const navigate = useNavigate();

	useEffect(() => searchText.current.focus(), []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const tempSearchTerm = searchText.current.value.trim();
		if (tempSearchTerm.replace(/[^\w\s]/gi, '').length === 0) {
			setSearchTerm('the lost world');
			setResultTitle('Please Enter Something ...');
		} else {
			setSearchTerm(tempSearchTerm);
		}
		navigate('/book'); // Ensure you navigate to the correct route for displaying results
	};

	return (
		<div className="search-form">
			<div className="container">
				<div className="search-form-content">
					<form className="search-form" onSubmit={handleSubmit}>
						<div className="search-form-elem flex flex-sb bg-white">
							<input
								type="text"
								className="form-control"
								placeholder="Search ..."
								ref={searchText}
							/>
							<button type="submit" className="search-button">
								<FaSearch className="text-purple" size={32} />
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SearchForm;
