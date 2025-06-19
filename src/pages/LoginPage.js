import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import "./PagesCSS/LoginPage.css";

function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();
	const [errors, setErrors] = useState({});
	const [noUserError, setNoUserError] = useState("");
 
	useEffect(() => {
		localStorage.removeItem('jwt');
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { username: username, password: password };

		AxiosInstance.post("http://localhost:8080/auth/login", payload)
			.then((response) => {
				const jwt = response.data;
				console.log("printing response data ", response.data);
				localStorage.setItem("jwt", jwt.jwt);
				navigate("/app/products");
			})
			.catch((error) => {
				if(error.response && error.response.status === 400){
					setErrors(error.response.data);
				}
				setNoUserError("User does not exist please check the username and password and try again");
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
			{errors.username && <p className="errorMessage">{errors.username}</p>}

			<div className="loginFormItemWrapper">
				<label className="loginFormItem">Password </label>
				<input
					className="loginFormItem loginInputField"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{errors.password && <p className="errorMessage">{errors.password}</p>}

			<button
				className="loginPageButton"
				type="submit"
				onClick={handleSubmit}
			>
				Login
			</button>
			{noUserError && <p className="errorMessage">{noUserError}</p>}
		</form>
	);
}

export default LoginPage;
