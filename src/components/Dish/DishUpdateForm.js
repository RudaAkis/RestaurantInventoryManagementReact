import { useState, useEffect } from "react";
import axiosInstance from "../../api/AxiosInstance";
import ProductDropdownSearch from "./ProductDropdownSearch";
import ProductQuantityInput from "./ProductQuantityInput";

function DishUpdateForm({ dish, onUpdate, products }) {
	const [formData, setFormData] = useState({
		name: "",
		selectedProducts: [], // List of products with ID & name
		quantities: {}, // Map: productId -> quantity
	});

	//Fills the dish with previous data
	useEffect(() => {
		if (dish) {
			const quantitiesMap = {};
			const selected = dish.ingredients.map((p) => {
				quantitiesMap[p.productId] = p.quantity.toString();
				return {
					productId: p.productId,
					name: p.productName,
					unitOfMeasure: p.unit,
				};
			});

			setFormData({
				name: dish.name,
				selectedProducts: selected,
				quantities: quantitiesMap,
			});
		}
	}, [dish]);

	const handleAddProduct = (product) => {
		setFormData((prev) => ({
			...prev,
			selectedProducts: [...prev.selectedProducts, product],
			quantities: { ...prev.quantities, [product.productId]: "" },
		}));
	};

	const handleRemoveProduct = (productToRemoveId) => {
		setFormData((prev) => {
			const updatedSelectedProducts = prev.selectedProducts.filter(
				(p) => p.productId !== productToRemoveId
			);

			const updatedQuantities = { ...prev.quantities };
			delete updatedQuantities[productToRemoveId];

			return {
				...prev,
				selectedProducts: updatedSelectedProducts,
				quantities: updatedQuantities,
			};
		});
	};

	const handleQuantityChange = (productId, value) => {
		setFormData((prev) => ({
			...prev,
			quantities: { ...prev.quantities, [productId]: value },
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const dishData = {
			name: formData.name,
			products: formData.selectedProducts.map((prod) => ({
				productId: prod.productId,
				quantity: parseFloat(formData.quantities[prod.productId]) || 0,
			})),
		};

		console.log(dishData);

		axiosInstance
			.put(
				"http://localhost:8080/api/inventory/dishes/" + dish.dishId,
				dishData
			)
			.then((response) => {
				const createdDish = response.data;
				console.log(response.data);
				onUpdate(createdDish);
				alert("The Dish was updated succesfully");
			})
			.catch((error) => {
				console.error("failed to create the dish " + error);
			});
	};

	return (
		<form className="dishFormContainer" onSubmit={handleSubmit}>
			<label className="dishFormField">Name of the dish</label>
			<input
				className="dishFormField"
				type="text"
				name="name"
				value={formData.name}
				onChange={(e) =>
					setFormData({ ...formData, name: e.target.value })
				}
			/>

			<label className="dishFormField">Search and add products</label>
			<ProductDropdownSearch
				items={products}
				selectedItems={formData.selectedProducts}
				onSelect={handleAddProduct}
			/>

			{formData.selectedProducts.map((product) => (
				<ProductQuantityInput
					key={product.productId}
					product={product}
					quantity={formData.quantities[product.productId]}
					onQuantityChange={handleQuantityChange}
					handleRemoveProduct={handleRemoveProduct}
				/>
			))}

			<button className="dishFormSubmitBtn" type="submit">
				Submit
			</button>
		</form>
	);
}

export default DishUpdateForm;
