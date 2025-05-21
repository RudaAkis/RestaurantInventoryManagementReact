import pencilIcon from "../images/pencil_1972600.png";
import trashIcon from "../images/trash-bin_8081578.png";

function ItemButtons() {
	return (
		<>
			<button id="updateButton" className="productButton">
				<img className="iconImage" src={pencilIcon} alt="-" />
			</button>

			<button id="deleteButton" className="productButton">
				<img className="iconImage" src={trashIcon} alt="-" />
			</button>
		</>
	);
}

export default ItemButtons;
