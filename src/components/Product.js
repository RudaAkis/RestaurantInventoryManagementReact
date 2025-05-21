import "./Product.css";
import ItemUpdateButton from "./ItemUpdateButton";
import ItemDeleteButton from "./ItemDeleteButton";

function Product() {
	return (
		<>
			<div className="productContainer">
				<p className="itemParagraph">Name of product</p>

				<p className="itemParagraph">quantity</p>

				<p className="itemParagraph"> price </p>

				<p className="itemParagraph">price/unit</p>

				<p className="itemParagraph">expiry date</p>

				<p className="itemParagraph">date added</p>

				<p className="itemParagraph">Cetegory</p>

				<p className="itemParagraph">Vendor name</p>

				<ItemUpdateButton />
				<ItemDeleteButton />
			</div>
		</>
	);
}
export default Product;
