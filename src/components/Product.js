import "./Product.css";
import ItemUpdateButton from "./ItemUpdateButton";
import ItemDeleteButton from "./ItemDeleteButton";
import { differenceInCalendarDays } from "date-fns";

function Product({ product, onDelete, onUpdate }) {
	//The imported class is used instead of the default time in milliseconds for readability
	const daysTillExpire = (expiryDate) => {
		return differenceInCalendarDays(new Date(expiryDate), new Date());
	};

	const getExpiryClass = (expiryDate) => {
		const daysLeft = daysTillExpire(expiryDate);
		if (daysLeft <= 1) return "expiry-danger";
		if (daysLeft <= 3) return "expiry-warning";
		return "expiry-safe";
	};

	return (
		<>
			<div className="productContainer">
				<div className="itemParagraph">
					<p id="pName">{product.name}</p>
				</div>

				<div className="itemParagraph">
					<p>{product.quantity + product.unitOfMeasure}</p>
				</div>

				<div className="itemParagraph">
					<p>product</p>
				</div>

				<div className="itemParagraph">
					<p>
						{(product.price / product.quantity).toFixed(2) +
							"/" +
							product.unitOfMeasure}
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
				<ItemUpdateButton
					productToEdit={product}
					onComplete={onUpdate}
					onUpdate={onUpdate}
				/>
				<ItemDeleteButton
					idToDelete={product.productId}
					onActionComplete={onDelete}
				/>
			</div>
		</>
	);
}
export default Product;
