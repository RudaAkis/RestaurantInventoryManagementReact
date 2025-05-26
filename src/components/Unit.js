import ItemDeleteButton from "./ItemDeleteButton";
import ItemUpdateButton from "./ItemUpdateButton";
import "./Unit.css";
import UnitUpdateForm from "./UnitUpdateForm";
function Unit({ unit, onDelete, onUpdate }) {
	return (
		<div className="unitItemContainer">
			<p className="unitParagraph">{unit.name}</p>
			<ItemUpdateButton
				formChildCompoenent={
					<UnitUpdateForm unitToUpdate={unit} onUpdate={onUpdate} />
				}
			/>
			<ItemDeleteButton
				idToDelete={unit.unitId}
				url={"http://localhost:8080/api/inventory/units/"}
				onActionComplete={onDelete}
			/>
		</div>
	);
}

export default Unit;
