import pencilIcon from "../images/pencil_1972600.png";

function ItemUpdateButton() {
	return (
		<>
			<button id="updateButton" className="productButton">
				<img className="iconImage" src={pencilIcon} alt="-" />
			</button>
		</>
	);
}

export default ItemUpdateButton;
