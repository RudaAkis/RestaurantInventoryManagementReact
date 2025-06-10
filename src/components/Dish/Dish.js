import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import "./Dish.css";
import { useState } from "react";
import MakeDishButton from "./MakeDishButton";
import DishUpdateForm from "./DishUpdateForm";
import { getUserFromToken } from "../../utils/authUtils";
import axiosInstance from "../../api/AxiosInstance";

function Dish({ dish, onDelete, onUpdate, products }) {
	const [showDishProducts, setShowDishProducts] = useState(false);
	const [seeProductsText, setSeeProductsText] = useState("See Products");
	const user = getUserFromToken();

	const displayDishProducts = () => {
		if (showDishProducts) {
			setShowDishProducts(false);
			setSeeProductsText("See Products");
		} else {
			setShowDishProducts(true);
			setSeeProductsText("Hide products");
		}
	};

	const handleMakeDish = () => {
		const count = 1;
		axiosInstance
			.post(
				`http://localhost:8080/api/inventory/dishes/${dish.dishId}/make/${count}`
			)
			.then((response) => {
				alert("Dish prepared");
			})
			.catch((error) => {
				console.error("failed to make dish ", error);
			});
	};

	return (
		<div className="dishContainer">
			<p className="dishParagraph">{dish.name}</p>
			<button className="productButton" onClick={displayDishProducts}>
				{seeProductsText}
			</button>
			<MakeDishButton handleMakeDish={handleMakeDish} />
			{["ADMIN", "MANAGER"].includes(user?.role) && (
				<ItemUpdateButton
					formChildCompoenent={
						<DishUpdateForm
							dish={dish}
							onUpdate={onUpdate}
							products={products}
						/>
					}
				/>
			)}

			{user?.role === "ADMIN" && (
				<ItemDeleteButton
					idToDelete={dish.dishId}
					onActionComplete={onDelete}
					url={"http://localhost:8080/api/inventory/dishes/"}
				/>
			)}
			{showDishProducts && (
				<>
					<ul className="dishProductList">
						{dish.ingredients.map((product) => (
							<li className="dishProductListItem">
								{product.productName +
									" " +
									product.quantity +
									product.unit}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}

export default Dish;
