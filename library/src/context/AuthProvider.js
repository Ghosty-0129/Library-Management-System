import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});

	const isAuth = () => {
		if (typeof window !== 'undefined') {
			return !!localStorage.getItem('token');
		}
		return false;
	};

	const setLocalStorage = (key, value) => {
		if (typeof window !== 'undefined') {
			localStorage.setItem(key, JSON.stringify(value));
		}
	};

	const removeLocalStorage = (key) => {
		if (typeof window !== 'undefined') {
			localStorage.removeItem(key);
		}
	};

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				isAuth,
				setLocalStorage,
				removeLocalStorage,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
