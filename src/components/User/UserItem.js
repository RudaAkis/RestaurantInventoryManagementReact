import { getUserFromToken } from "../../utils/authUtils";
import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import UserUpdateForm from "./UserUpdateForm";
import "../Unit.css";
import "./User.css";

function UserItem({ userItem, onUpdate, onDelete }) {
	const user = getUserFromToken();
	return (
		<div className="unitItemContainer">
			<p className="userParagarph">{userItem.firstname}</p>
			<p className="userParagarph">{userItem.lastname}</p>
			<p className="userParagarph">{userItem.email}</p>
			<p className="userParagarph">{userItem.role}</p>
			{/* <p className="userParagarph">{userItem.username}</p> */}

			{user?.role === "ADMIN" && (
				<>
					<ItemUpdateButton
						formChildCompoenent={
							<UserUpdateForm
								unitToUpdate={userItem}
								onUpdate={onUpdate}
							/>
						}
					/>

					<ItemDeleteButton
						idToDelete={userItem.userId}
						url={"http://localhost:8080/auth/delete/"}
						onActionComplete={onDelete}
					/>
				</>
			)}
		</div>
	);
}

export default UserItem;
