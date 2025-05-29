import "../pages/PagesCSS/DishPage.css";
import { useState, useEffect } from "react";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import DishForm from "../components/Dish/DishForm";
import Dish from "../components/Dish/Dish";
import axios from "axios";

function DishesPage() {
	const [showModal, setShowModal] = useState(false);
	const [dishes, setDishes] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/inventory/dishes/all")
			.then((response) => {
				setDishes(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log("failed to fetch dishes " + error);
			});
	}, []);

	return (
		<>
			<div className="dishMainContainer">
				<AddButton setShowModal={setShowModal} />
				{dishes.map((dish) => (
					<Dish dish={dish} />
				))}
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
