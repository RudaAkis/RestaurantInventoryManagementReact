import { jwtDecode } from "jwt-decode";

export const getUserFromToken = () => {
	const token = localStorage.getItem("jwt");
	if (!token) return null;

	try {
		const decoded = jwtDecode(token);
		console.log(token);
		console.log(decoded);
		return decoded.sub;
	} catch (error) {
		console.error("Invalid JWT:", error);
		return null;
	}
};

export const logout = () => {
	localStorage.removeItem("jwt");
	window.location.href = "/login"; // or use `navigate("/login")` from react-router
};
