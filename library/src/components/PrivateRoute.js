import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthProvider'; // Adjust the path if necessary

const PrivateRoute = ({ children, requiredRole }) => {
	const location = useLocation();
	const { isAuth } = useContext(AuthContext);
	const userRole = localStorage.getItem('role');

	if (!isAuth()) {
		return <Navigate to="/login" state={{ from: location }} />;
	}

	if (requiredRole && requiredRole !== userRole) {
		return <Navigate to="/login" />;
	}

	return children;
};

export default PrivateRoute;
