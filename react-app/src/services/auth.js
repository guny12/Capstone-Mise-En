export const authenticate = async () => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await response.json();
};

export const login = async (credential, password) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			credential,
			password,
		}),
	});
	return await response.json();
};

export const logout = async () => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	return await response.json();
};

export const signUp = async (username, email, password, firstName, lastName) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			email,
			password,
			firstName,
			lastName,
		}),
	});
	return await response.json();
};
