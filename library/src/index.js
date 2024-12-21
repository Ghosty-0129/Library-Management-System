import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './index.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import Logout from './components/Logout';
import AdminApproval from './components/AdminApproval';
import UserDash from './components/UserDash';
import { AuthProvider } from './context/AuthProvider';
import { AppProvider } from './context/context';
import PrivateRoute from './components/PrivateRoute';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<AuthProvider>
		<AppProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Home />}>
						<Route path="about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/logout" element={<Logout />} />
						

						<Route
							path="/add"
							element={
								<PrivateRoute>
									<AddBook  />
								</PrivateRoute>
							}
						/>
				

						<Route
							path="/admin"
							element={
								<PrivateRoute requiredRole="admin">
									<AdminApproval />
								</PrivateRoute>
							}
						/>
						<Route
							path="/user"
							element={
								<PrivateRoute requiredRole="user">
									<UserDash />
								</PrivateRoute>
							}
						/>
						<Route
							path="/book"
							element={
								<PrivateRoute>
									<BookList />
								</PrivateRoute>
							}
						/>
					</Route>
				</Routes>
			</BrowserRouter>
		</AppProvider>
	</AuthProvider>
);
