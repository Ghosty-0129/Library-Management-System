export const isAuth = () => {
	if (window !== 'undefined') {
		if (localStorage.getItem('user')) {
			return true; ///JSON.parse(localStorage.getItem('user'));
		} else {
			return false;
		}
	}
};
export const setLocalStorage = (key, value) => {
	if (window !== 'undefined') {
		localStorage.setItem(key, JSON.stringify(value));
	}
};
// remove from localStorage
export const removeLocalStorage = (key) => {
	if (window !== 'undefined') {
		localStorage.removeItem(key);
	}
};
