import pencilIcon from "../images/pencil_1972600.png";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";
import Modal from "./Modal";
import ProductUpdateForm from "./ProductUpdateForm";

function ItemUpdateButton({ productToEdit, onUpdate }) {
	const [showProductModal, setShowProductModal] = useState(false);

	const handleClick = () => {
		setShowProductModal(true);
		console.log("Update button clicked");
	};

	return (
		<>
			<button
				onClick={handleClick}
				id="updateButton"
				className="productButton"
			>
				<img className="iconImage" src={pencilIcon} alt="-" />
			</button>

			{showProductModal && (
				<Modal
					onClose={() => setShowProductModal(false)}
					child={
						<ProductUpdateForm
							productToUpdate={productToEdit}
							onClose={() => setShowProductModal(false)}
							onUpdate={onUpdate}
						/>
					}
				/>
			)}
		</>
	);
}

export default ItemUpdateButton;
