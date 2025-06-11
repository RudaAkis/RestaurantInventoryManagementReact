import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";

function UserUpdateForm({ userToUpdate, onUpdate }) {
	const [formData, setFormData] = useState({
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		role: "",
	});

	useEffect(() => {
		if (userToUpdate !== null) {
			setFormData({
				firstname: userToUpdate.firstname,
				lastname: userToUpdate.lastname,
				email: userToUpdate.email,
				username: userToUpdate.username,
				role: userToUpdate.role,
			});
		}
	}, [userToUpdate]);

	const handleChange = (event) => {
		const { name, value } = event.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log("Changed field:", name, "New value:", value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { ...formData };

		axiosInstance
			.put(`http://localhost:8080/auth/${userToUpdate.userId}`, payload)
			.then((response) => {
				const updatedUser = response.data;
				onUpdate(updatedUser);
				alert("User updated successfully");
			})
			.catch((error) => {
				console.error("Error updating user:", error);
			});
	};

	return (
		<form className="form">
			<label className="formLabel">Firstname</label>
			<input
				name="firstname"
				value={formData.firstname}
				onChange={handleChange}
				className="formInput"
				type="text"
				placeholder="John"
			/>

			<label className="formLabel">Lastname</label>
			<input
				name="lastname"
				value={formData.lastname}
				onChange={handleChange}
				className="formInput"
				type="text"
				placeholder="Doe"
			/>

			<label className="formLabel">Username</label>
			<input
				name="username"
				value={formData.username}
				onChange={handleChange}
				className="formInput"
				type="text"
				placeholder="johndoe"
			/>

			<label className="formLabel">E-mail</label>
			<input
				name="email"
				value={formData.email}
				onChange={handleChange}
				className="formInput"
				type="email"
				placeholder="john.doe@example.com"
			/>

			<label className="formLabel">Role</label>
			<select
				name="role"
				value={formData.role}
				onChange={handleChange}
				className="formInput"
			>
				<option value={""}>Select Role</option>
				<option value={"USER"}>User</option>
				<option value={"MANAGER"}>Manager</option>
				<option value={"ADMIN"}>Admin</option>
			</select>

			<button className="submitBtn" onClick={handleSubmit}>
				Update User
			</button>
		</form>
	);
}

export default UserUpdateForm;
