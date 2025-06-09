import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
	const token = localStorage.getItem("jwt");
	if (!token) return null;

	try {
		const decoded = jwtDecode(token);

		//Return an object with all of the data from the user we decode from the jwt token
		return {
			username: decoded.sub,
			firstname: decoded.firstname,
			lastname: decoded.lastname,
			role: decoded.role,
			email: decoded.email,
		};
	} catch (error) {
		console.error("Invalid JWT:", error);
		return null;
	}
};

export const logout = () => {
	localStorage.removeItem("jwt");
	window.location.href = "/login"; // or use `navigate("/login")` from react-router
};
