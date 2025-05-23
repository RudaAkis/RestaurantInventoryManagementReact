import pencilIcon from "../images/pencil_1972600.png";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";
import axios from "axios";
import Modal from "./Modal";
import ProductForm from "./ProductForm";

function ItemUpdateButton({ productToEdit }) {
	const [showUpdateModal, setShowUpdateModal] = useState(false);
	const [showProductModal, setShowProductModal] = useState(false);

	const handleClick = () => {
		setShowUpdateModal(true);
		setShowProductModal(true);
		console.log("Update button clicked");
	};

	const handleConfirm = () => {
		setShowUpdateModal(false);
		setShowProductModal(true);
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
						<ProductForm
							onClose={() => setShowProductModal(false)}
							productToEdit={productToEdit}
							isEditingEnabled={true}
						/>
					}
				/>
			)}
		</>
	);
}

export default ItemUpdateButton;
