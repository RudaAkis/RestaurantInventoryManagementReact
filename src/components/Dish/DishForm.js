// DishForm.js
import { useState } from "react";
import "./DishForm.css";
import ProductDropdownSearch from "./ProductDropdownSearch";
import ProductQuantityInput from "./ProductQuantityInput";
import axiosInstance from "../../api/AxiosInstance";

function DishForm({ onClose, onAdd, products }) {
	const [formData, setFormData] = useState({
		name: "",
		selectedProducts: [], // List of products with ID & name
		quantities: {}, // Map: productId -> quantity
	});

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
			.post("http://localhost:8080/api/inventory/dishes", dishData)
			.then((response) => {
				const createdDish = response.data;
				console.log(response.data);
				onAdd(createdDish);
			})
			.catch((error) => {
				console.error("failed to create the dish " + error);
			});
		onClose();
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

export default DishForm;
