import { getUserFromToken } from "../../utils/authUtils";
import ItemDeleteButton from "../ItemDeleteButton";
import ItemUpdateButton from "../ItemUpdateButton";
import "./Unit.css";
import UnitUpdateForm from "./UnitUpdateForm";
function Unit({ unit, onDelete, onUpdate }) {
	const user = getUserFromToken();

	return (
		<div className="unitItemContainer">
			<p className="unitParagraph">{unit.name}</p>

			{["ADMIN", "MANAGER"].includes(user?.role) && (
				<ItemUpdateButton
					formChildCompoenent={
						<UnitUpdateForm
							unitToUpdate={unit}
							onUpdate={onUpdate}
						/>
					}
				/>
			)}
			{user?.role === "ADMIN" && (
				<ItemDeleteButton
					idToDelete={unit.unitId}
					url={"http://localhost:8080/api/inventory/units/"}
					onActionComplete={onDelete}
				/>
			)}
		</div>
	);
}

export default Unit;
