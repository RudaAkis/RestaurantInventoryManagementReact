import trashIcon from "../images/trash-bin_8081578.png";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";

function ItemDeleteButton({ idToDelete, onActionComplete }) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () => {
		console.log("Update button clicked");
		setShowModal(true);
	};

	const handleConfirm = async () => {
		try {
			await axios.delete(
				"http://localhost:8080/api/inventory/products/" + idToDelete
			);
			console.log("Product deleted:", idToDelete);
			//This is a bit stupid JavaScript fucntionality to basically mean that if the function with this name exists and is not null or undefined call it
			//Could also be written as if (onActionComplete){ onActionComplete() }
			onActionComplete?.(idToDelete);
		} catch (error) {
			console.error("Error deleting product:", error);
		} finally {
			setShowModal(false);
		}
	};

	return (
		<>
			<button
				onClick={handleClick}
				id="deleteButton"
				className="productButton"
			>
				<img className="iconImage" src={trashIcon} alt="-" />
			</button>
			{showModal && (
				<ConfirmModal
					title={"Delete Product"}
					message={
						"Are you sure you want to delete the item? Removing this product will also remove it from all dishes that currently include it. This action cannot be undone."
					}
					onConfirm={handleConfirm}
					onCancel={() => setShowModal(false)}
				/>
			)}
		</>
	);
}

export default ItemDeleteButton;
