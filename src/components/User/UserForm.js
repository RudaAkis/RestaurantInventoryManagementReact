import { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";

function UserForm({ onClose, onAdd }) {
	const [userFormData, setUserFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		firstPassword: "",
		repeatPassword: "",
		role: "",
	});
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		//Assign the name and the value from the input to the variables
		const { name, value } = event.target;
		//Set the form data where the name equals object property name and the value is the value from the input
		setUserFormData((prev) => ({
			...prev, //Spread operator to reassign the same values to everything else in the form
			[name]: value,
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = {
			...userFormData,
			firstname: userFormData.firstname,
			lastname: userFormData.lastname,
			email: userFormData.email,
			username: userFormData.username,
			firstPassword: userFormData.firstPassword,
			repeatPassword: userFormData.repeatPassword,
			role: userFormData.role,
		};
		console.log("user to be added", payload);
		axiosInstance
			.post("http://localhost:8080/auth/create/employee", payload)
			.then((response) => {
				const newUser = response.data;
				console.log("test print from back end response", response.data);
				onAdd(newUser);
				onClose();
			})
			.catch((error) => {
				if(error.response && error.response.status === 400){
					setErrors(error.response.data);
					console.log("The error is : ", error.response.data);
				}
				console.error("Error creating product:", error);
			});
	};

	return (
		<form>
			<label className="userFormLabel">Firstname</label>
			<input
				name="firstname"
				value={userFormData.firstname}
				onChange={handleChange}
				type="text"
				className="userFormInput"
			/>
			{errors.firstname && <p className="errorMessage">{errors.firstname}</p>}

			<label className="userFormLabel">Lastname</label>
			<input
				name="lastname"
				value={userFormData.lastname}
				onChange={handleChange}
				type="text"
				className="userFormInput"
			/>
			{errors.lastname && <p className="errorMessage">{errors.lastname}</p>}

			<label className="userFormLabel">Username</label>
			<input
				name="username"
				value={userFormData.username}
				onChange={handleChange}
				type="text"
				className="userFormInput"
			/>
			{errors.username && <p className="errorMessage">{errors.username}</p>}

			<label className="userFormLabel">E-mail</label>
			<input
				name="email"
				value={userFormData.email}
				onChange={handleChange}
				type="text"
				className="userFormInput"
			/>
			{errors.email && <p className="errorMessage">{errors.email}</p>}

			<label className="userFormLabel">Password</label>
			<input
				name="firstPassword"
				value={userFormData.password}
				onChange={handleChange}
				type="password"
				className="userFormInput"
			/>
			{errors.firstPassword && <p className="errorMessage">{errors.firstPassword}</p>}

			<label className="userFormLabel">Repeat Password</label>
			<input
				name="repeatPassword"
				value={userFormData.repassword}
				onChange={handleChange}
				type="password"
				className="userFormInput"
			/>
			{errors.repeatPassword && <p className="errorMessage">{errors.repeatPassword}</p>}

			<select
				name="role"
				value={userFormData.role}
				onChange={handleChange}
				className="userFormInput"
			>
				<option value={""}>Select Role:</option>
				<option value={"USER"}>User</option>
				<option value={"MANAGER"}>Manager</option>
				<option value={"ADMIN"}>Admin</option>
			</select>

			<button type="submit" onClick={handleSubmit}>
				Add user
			</button>
		</form>
	);
}

export default UserForm;
