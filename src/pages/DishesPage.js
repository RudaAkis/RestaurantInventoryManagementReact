import "../pages/PagesCSS/DishPage.css";
import Dish from "../components/Dish";
import { useState } from "react";
import AddProductButton from "../components/AddProductButton";
import Modal from "../components/Modal";
import DishForm from "../components/DishForm";

function DishesPage() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div className="dishMainContainer">
				<AddProductButton setShowModal={setShowModal} />
				<Dish />
				<Dish />
				<Dish />
				<Dish />
				{showModal && (
					<Modal
						onClose={() => setShowModal(false)}
						formChild={<DishForm />}
					/>
				)}
			</div>
		</>
	);
}

export default DishesPage;
