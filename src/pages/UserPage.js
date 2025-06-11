import { useState, useEffect } from "react";
import axiosInstance from "../api/AxiosInstance";
import UserItem from "../components/User/UserItem";
import "./PagesCSS/ProductPage.css";
import { getUserFromToken } from "../utils/authUtils";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import UserForm from "../components/User/UserForm";

function UserPage() {
	const [users, setUsers] = useState([]);
	const user = getUserFromToken();
	const [showModal, setShowModal] = useState(false);

	//Get all users request
	useEffect(() => {
		axiosInstance
			.get("http://localhost:8080/auth/all")
			.then((response) => {
				console.log(response.data);
				setUsers(response.data);
			})
			.catch((error) => {
				console.log("Failed to load users ", error);
			});
	}, []);

	const addUserLocally = (newUser) => {
		setUsers((prev) => [...prev, newUser]);
	};

	const removeUserLocally = (deletedUserId) => {
		setUsers((prev) =>
			prev.filter((user) => user.userId !== deletedUserId)
		);
	};

	const updateUserLocally = (updatedUser) => {
		setUsers((prev) =>
			prev.map((user) =>
				user.userId === updatedUser.userId ? updatedUser : user
			)
		);
	};

	return (
		<div className="mainContainer">
			{user?.role === "ADMIN" && (
				<>
					<AddButton setShowModal={setShowModal} />
					{users.map((user) => (
						<UserItem
							userItem={user}
							onDelete={removeUserLocally}
							onUpdate={updateUserLocally}
						/>
					))}

					{showModal && (
						<Modal
							onClose={() => setShowModal(false)}
							child={
								<UserForm
									onClose={() => setShowModal(false)}
									onAdd={addUserLocally}
								/>
							}
						/>
					)}
				</>
			)}
		</div>
	);
}

export default UserPage;
