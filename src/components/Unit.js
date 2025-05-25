import ItemDeleteButton from "./ItemDeleteButton";
import "./Unit.css";
function Unit({ unit, onDelete }) {
	return (
		//style={{ width: "15%" }}
		<div className="unitItemContainer">
			<p className="unitParagraph">{unit.name}</p>
			<ItemDeleteButton
				idToDelete={unit.unitId}
				url={"http://localhost:8080/api/inventory/units/"}
				onActionComplete={onDelete}
			/>
		</div>
	);
}

export default Unit;
