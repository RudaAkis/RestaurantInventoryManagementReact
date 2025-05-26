import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import "../Unit.css";
import VendorUpdateForm from "./VendorUpdateForm";
function Vendor({ vendor, onDelete, onUpdate }) {
	return (
		<div className="unitItemContainer">
			<p className="unitParagraph">{vendor.name}</p>
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
			<ItemDeleteButton
				idToDelete={vendor.vendorId}
				url={"http://localhost:8080/api/inventory/vendors/"}
				onActionComplete={onDelete}
			/>
		</div>
	);
}

export default Vendor;
