import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import '../Unit/Unit.css';
import VendorUpdateForm from "./VendorUpdateForm";
import { getUserFromToken } from "../../utils/authUtils";
function Vendor({ vendor, onDelete, onUpdate }) {
	const user = getUserFromToken();
	return (
		<div className="unitItemContainer">
			<p className="unitParagraph">{vendor.name}</p>

			{["ADMIN", "MANAGER"].includes(user?.role) && (
				<ItemUpdateButton
					formChildCompoenent={
						<VendorUpdateForm
							vendorToUpdate={vendor}
							onUpdate={onUpdate}
						/>
					}
					unitToUpdate={vendor}
					onUpdate={onUpdate}
				/>
			)}

			{user?.role === "ADMIN" && (
				<ItemDeleteButton
					idToDelete={vendor.vendorId}
					url={"http://localhost:8080/api/inventory/vendors/"}
					onActionComplete={onDelete}
				/>
			)}
		</div>
	);
}

export default Vendor;
