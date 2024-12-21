import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../../images/logo.png';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';

const Navbar = () => {
	const [toggleMenu, setToggleMenu] = useState(false);
	const handleNavbar = () => setToggleMenu(!toggleMenu);

	const location = useLocation();
	const currentPath = location.pathname; // Get the current path
	const userRole = localStorage.getItem('role'); // Retrieve user role
	const isAuthenticated = !!localStorage.getItem('authToken'); // Check for authentication token

	// Conditionally hide the NavBar on the register and login pages
	if (currentPath === '/register' ) {
		return null;
	}

	if (currentPath === '/login') {
		return (
			<nav className="navbar" id="navbar">
				<div className="container navbar-content flex">
					<div className="brand-and-toggler flex flex-sb">
						<Link to="/" className="navbar-brand flex">
							<img src={logoImg} alt="site logo" />
							<span className="text-uppercase fw-7 fs-24 ls-1">
								bookhub
							</span>
						</Link>
						<button
							type="button"
							className="navbar-toggler-btn"
							onClick={handleNavbar}
						>
							<HiOutlineMenuAlt3
								size={35}
								style={{
									color: `${toggleMenu ? '#fff' : '#010101'}`,
								}}
							/>
						</button>
					</div>

					<div
						className={
							toggleMenu
								? 'navbar-collapse show-navbar-collapse'
								: 'navbar-collapse'
						}
					>
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link
									to="/book"
									className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
								>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/about"
									className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
								>
									About
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/login"
									className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
								>
									Login
								</Link>
							</li>
							<li className="nav-item">
								<Link
									to="/register"
									className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
								>
									Register
								</Link>
							</li>
							
						</ul>
					</div>
				</div>
			</nav>
		);
		};

	return (
		<nav className="navbar" id="navbar">
			<div className="container navbar-content flex">
				<div className="brand-and-toggler flex flex-sb">
					<Link to="/" className="navbar-brand flex">
						<img src={logoImg} alt="site logo" />
						<span className="text-uppercase fw-7 fs-24 ls-1">
							bookhub
						</span>
					</Link>
					<button
						type="button"
						className="navbar-toggler-btn"
						onClick={handleNavbar}
					>
						<HiOutlineMenuAlt3
							size={35}
							style={{
								color: `${toggleMenu ? '#fff' : '#010101'}`,
							}}
						/>
					</button>
				</div>

				<div
					className={
						toggleMenu
							? 'navbar-collapse show-navbar-collapse'
							: 'navbar-collapse'
					}
				>
					<ul className="navbar-nav">
						<li className="nav-item">
							<Link
								to="/book"
								className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
							>
								Home
							</Link>
						</li>

						<li className="nav-item">
							<Link
								to="/about"
								className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
							>
								About
							</Link>
						</li>

						{/* Show "AddBook" link only if the user is an admin */}
						{userRole === 'admin' && (
							<li className="nav-item">
								<Link
									to="/admin"
									className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
								>
									dashboard
								</Link>
							</li>
						)}

						{userRole === 'user' && (
							<li className="nav-item">
								<Link
									to="/user"
									className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
								>
									dash
								</Link>
							</li>
						)}

						<li className="nav-item">
							<Link
								to="/add"
								className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
							>
								AddBook
							</Link>
						</li>

						<li className="nav-item">
							<Link
								to="/logout"
								className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
							>
								LogOut
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
