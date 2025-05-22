import "./Product.css";
import ItemUpdateButton from "./ItemUpdateButton";
import ItemDeleteButton from "./ItemDeleteButton";

function Product({ product }) {
	return (
		<>
			<div className="productContainer">
				<p className="itemParagraph">{product.name}</p>

				<p className="itemParagraph">
					{product.quantity + product.unitOfMeasure}
				</p>

				<p className="itemParagraph"> product</p>

				<p className="itemParagraph">
					{product.price / product.quantity +
						"/" +
						product.unitOfMeasure}
				</p>

				<p className="itemParagraph">
					Expiring on:
					<br />
					{product.expiryDate}
				</p>

				<p className="itemParagraph">
					Added on: <br /> {product.dateAdded}
				</p>

				<p className="itemParagraph">{product.category}</p>

				<p className="itemParagraph">{product.vendor}</p>

				<ItemUpdateButton />
				<ItemDeleteButton />
			</div>
		</>
	);
}
export default Product;
