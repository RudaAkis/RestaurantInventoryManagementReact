import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import "./Dish.css";
import { useState } from "react";
import MakeDishButton from "./MakeDishButton";

function Dish({ dish, onDelete }) {
	const [showDishProducts, setShowDishProducts] = useState(false);
	const [seeProductsText, setSeeProductsText] = useState("See Products");

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
		alert("Dish prepared");
	};

	return (
		<div className="dishContainer">
			<p className="dishParagraph">{dish.name}</p>
			<button className="productButton" onClick={displayDishProducts}>
				{seeProductsText}
			</button>
			<MakeDishButton handleMakeDish={handleMakeDish} />
			<ItemUpdateButton />
			<ItemDeleteButton
				idToDelete={dish.dishId}
				onActionComplete={onDelete}
				url={"http://localhost:8080/api/inventory/dishes/"}
			/>
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
