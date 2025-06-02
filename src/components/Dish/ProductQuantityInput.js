// ProductQuantityInput.js
import "./DishForm.css";

function ProductQuantityInput({
	product,
	quantity,
	onQuantityChange,
	handleRemoveProduct,
}) {
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
			<button
				type="button"
				className="removeBtn"
				onClick={() => handleRemoveProduct(product.productId)}
			>
				Remove
			</button>
		</div>
	);
}

export default ProductQuantityInput;
