import ItemUpdateButton from "../ItemUpdateButton";
import ItemDeleteButton from "../ItemDeleteButton";
import "../Unit.css";
import CategoryUpdateForm from "./CategoryUpdateForm";
function Category({ category, onDelete, onUpdate }) {
	return (
		<div className="unitItemContainer">
			<p className="unitParagraph">{category.name}</p>
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
			<ItemDeleteButton
				idToDelete={category.categoryId}
				url={"http://localhost:8080/api/inventory/category/"}
				onActionComplete={onDelete}
			/>
		</div>
	);
}

export default Category;
