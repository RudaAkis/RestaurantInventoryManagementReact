import pencilIcon from "../images/pencil_1972600.png";
import { useState } from "react";
import Modal from "./Modal";
import ProductUpdateForm from "./Product/ProductUpdateForm";

function ItemUpdateButton({ formChildCompoenent }) {
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
					child={formChildCompoenent}
				/>
			)}
		</>
	);
}

export default ItemUpdateButton;
