import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import "../Unit.css";
import CategoryUpdateForm from "./CategoryUpdateForm";
import { getUserFromToken } from "../../utils/authUtils";
function Category({ category, onDelete, onUpdate }) {
	const user = getUserFromToken();
	return (
		<div className="unitItemContainer">
			<p className="unitParagraph">{category.name}</p>

			{["ADMIN", "MANAGER"].includes(user?.role) && (
				<ItemUpdateButton
					formChildCompoenent={
						<CategoryUpdateForm
							categoryToUpdate={category}
							onUpdate={onUpdate}
						/>
					}
					unitToUpdate={category}
					onUpdate={onUpdate}
				/>
			)}

			{user?.role === "ADMIN" && (
				<ItemDeleteButton
					idToDelete={category.categoryId}
					url={"http://localhost:8080/api/inventory/category/"}
					onActionComplete={onDelete}
				/>
			)}
		</div>
	);
}

export default Category;
