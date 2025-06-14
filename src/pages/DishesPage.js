import "../pages/PagesCSS/DishPage.css";
import { useState, useEffect } from "react";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import DishForm from "../components/Dish/DishForm";
import Dish from "../components/Dish/Dish";
import axiosInstance from "../api/AxiosInstance";
import { getUserFromToken } from "../utils/authUtils";

function DishesPage() {
	const [showModal, setShowModal] = useState(false);
	const [dishes, setDishes] = useState([]);
	const [products, setProducts] = useState([]);
	const user = getUserFromToken();

	useEffect(() => {
		axiosInstance
			.get("http://localhost:8080/api/inventory/dishes/all")
			.then((response) => {
				setDishes(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.log("failed to fetch dishes " + error);
			});
	}, []);

	useEffect(() => {
		axiosInstance
			.get("http://localhost:8080/api/inventory/products/all")
			.then((response) => {
				setProducts(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("failed to fetch products " + error);
			});
	}, []);

	const addDishLocally = (dishToAdd) => {
		setDishes((previous) => [...previous, dishToAdd]);
	};

	const updateDishLocally = (updatedDish) => {
		setDishes((prev) =>
			prev.map((dish) =>
				dish.dishId === updatedDish.dishId ? updatedDish : dish
			)
		);
	};

	const removeDishLocally = (idToDelete) => {
		setDishes((previous) =>
			previous.filter((dish) => dish.dishId !== idToDelete)
		);
	};

	return (
		<>
			<div className="dishMainContainer">
				{user?.role === "ADMIN" && (
					<AddButton setShowModal={setShowModal} />
				)}
				{dishes.map((dish) => (
					<Dish
						dish={dish}
						onDelete={removeDishLocally}
						onUpdate={updateDishLocally}
						products={products}
					/>
				))}
				{showModal && (
					<Modal
						onClose={() => setShowModal(false)}
						child={
							<DishForm
								products={products}
								onClose={() => setShowModal(false)}
								onAdd={addDishLocally}
							/>
						}
					/>
				)}
			</div>
		</>
	);
}

export default DishesPage;
