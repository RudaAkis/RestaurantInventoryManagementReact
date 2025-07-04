import "./Product.css";
import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import { differenceInCalendarDays } from "date-fns";
import ProductUpdateForm from "./ProductUpdateForm";
import { getUserFromToken } from "../../utils/authUtils";
import ProductRefillButton from "./ProductRefillButton";
import axiosInstance from "../../api/AxiosInstance";

function Product({ product, onDelete, onUpdate }) {

	//The imported class is used instead of the default time in milliseconds for readability
	const daysTillExpire = (expiryDate) => {
		return differenceInCalendarDays(new Date(expiryDate), new Date());
	};

	const isLowStock = product.quantity <= product.startQuantity - ((product.startQuantity / 4) * 3);//Checks if current quantity is at 25% of startQuantity

	const user = getUserFromToken();

	//Sets the css class for expiration dates field
	const getExpiryClass = (expiryDate) => {
		const daysLeft = daysTillExpire(expiryDate);
		if (daysLeft < 0 ) return "expired";
		if (daysLeft <= 1) return "expiry-danger";
		if (daysLeft <= 3) return "expiry-warning";
		return "expiry-safe";
	};

	const pricePerUnit = (product.price / product.startQuantity).toFixed(3) +
							"€/" + product.unitOfMeasure;

	const handleProductRefill = (payload) => {
		axiosInstance.post(`http://localhost:8080/api/inventory/products/${product.productId}/refill`, payload)
		.then((response) => {
			const updatedProduct = response.data;
			onUpdate(updatedProduct);
		})
		.catch((error) => {
			console.log("Failed to refill product", error);
		})
	}

	return (
		<>
			<div className={`productContainer ${isLowStock ? 'lowStock' : ''}`}>
				<div className="itemParagraph">
					<p id="pName">{product.name}</p>
				</div>

				<div className={`itemParagraph ${isLowStock ? 'lowStock' : ''}`}>
					<p>{product.quantity.toFixed(2) + product.unitOfMeasure}</p>
				</div>

				<div className="itemParagraph">
					<p>{product.startQuantity + product.unitOfMeasure}</p>
				</div>

				<div className="itemParagraph">
					<p>product</p>
				</div>

				<div className="itemParagraph">
					<p>
						{pricePerUnit}
					</p>
				</div>

				<div className="itemParagraph">
					<p className={getExpiryClass(product.expiryDate)}>
						Expiring on:
						<br />
						{product.expiryDate?.split("T")[0]}
					</p>
				</div>

				<div className="itemParagraph">
					<p>
						Added on: <br /> {product.dateAdded?.split("T")[0]}
					</p>
				</div>

				<div className="itemParagraph">
					<p>{product.category}</p>
				</div>

				<div className="itemParagraph">
					<p>{product.vendor}</p>
				</div>

				{/* Conditional rendering based on roles for the editing and deleting of the product */}
				{["ADMIN", "MANAGER"].includes(user?.role) && (
					<ProductRefillButton 
						refillProduct={handleProductRefill} 
					/>
				)}

				{["ADMIN", "MANAGER"].includes(user?.role) && (
					<ItemUpdateButton
						formChildCompoenent={
							<ProductUpdateForm
								productToUpdate={product}
								onUpdate={onUpdate}
							/>
						}
					/>
				)}

				{user?.role === "ADMIN" && (
					<ItemDeleteButton
						idToDelete={product.productId}
						onActionComplete={onDelete}
						url={"http://localhost:8080/api/inventory/products/"}
					/>
				)}
			</div>
		</>
	);
}
export default Product;
