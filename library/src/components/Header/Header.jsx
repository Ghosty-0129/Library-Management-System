import React from 'react';


import './Header.css';
import SearchForm from '../searchFoam/SearchForm';


const Header = () => {
	return (
		<div className="holder">
			<header className="header">
				
				<div className="header-content flex flex-c text-center text-white">
					<h2 className="header-title text-capitalize">
						find your book of choice.
					</h2>
					<br />
					<p className="header-text fs-18 fw-3">
						"How blessed are those who are wise and can understand
						the consequences of their actions? They act diligently,
						avoiding mistakes, and managing their responsibilities
						with careful consideration. They have chosen, rightly!"
					</p>
					<SearchForm />
				</div>
			</header>
		</div>
	);
};

export default Header;
