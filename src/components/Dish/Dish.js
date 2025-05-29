import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import "./Dish.css";

function Dish({ dish }) {
	return (
		<div className="dishContainer">
			<p className="dishParagraph">{dish.name}</p>

			<ItemUpdateButton />
			<ItemDeleteButton />
		</div>
	);
}

export default Dish;
