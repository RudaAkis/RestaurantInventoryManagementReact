import trashIcon from "../images/trash-bin_8081578.png";

function ItemDeleteButton() {
	return (
		<>
			<button id="deleteButton" className="productButton">
				<img className="iconImage" src={trashIcon} alt="-" />
			</button>
		</>
	);
}

export default ItemDeleteButton;
