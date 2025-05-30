// ProductQuantityInput.js
import "./DishForm.css";

function ProductQuantityInput({ product, quantity, onQuantityChange }) {
	return (
		<div className="productQuantityContainer">
			<label className="formProductField">Product: {product.name}</label>
			<label className="formProductField">Quantity</label>
			<input
				className="formProductField"
				type="number"
				name="quantity"
				value={quantity}
				onChange={(e) =>
					onQuantityChange(product.productId, e.target.value)
				}
				placeholder="1.0..."
			/>
			<label>{product.unitOfMeasure}</label>
		</div>
	);
}

export default ProductQuantityInput;
