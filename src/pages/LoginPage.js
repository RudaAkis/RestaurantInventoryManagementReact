import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import "./PagesCSS/LoginPage.css";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { username: username, password: password };

		AxiosInstance.post("http://localhost:8080/auth/login", payload)
			.then((response) => {
				const jwt = response.data;
				console.log("printing response data ", response.data);
				localStorage.setItem("jwt", jwt.jwt);
				navigate("/app/dashboard");
			})
			.catch((error) => {
				console.error("Failed to find the user " + error);
			});
	};

	return (
		<form className="loginForm">
			<div className="loginFormItemWrapper">
				<label className="loginFormItem">Username</label>
				<input
					className="loginFormItem loginInputField"
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
			</div>

			<div className="loginFormItemWrapper">
				<label className="loginFormItem">Password </label>
				<input
					className="loginFormItem loginInputField"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>

			<button
				className="loginPageButton"
				type="submit"
				onClick={handleSubmit}
			>
				Login
			</button>
		</form>
	);
}

export default LoginPage;
