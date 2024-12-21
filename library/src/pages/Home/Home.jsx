import React from 'react';

import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';

const Home = () => {
	return (
		<main>
			<Navbar/>
			<Header />
			<Outlet />
		</main>
	);
};

export default Home;
