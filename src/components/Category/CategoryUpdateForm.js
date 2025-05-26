import axios from "axios";
import { useState, useEffect } from "react";

function CategoryUpdateForm({ categoryToUpdate, onUpdate }) {
	const [formCategory, setFormCategory] = useState("");

	useEffect(() => {
		if (categoryToUpdate !== null) {
			setFormCategory(categoryToUpdate.name);
		}
	}, []);

	const handleChange = (event) => {
		setFormCategory(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { name: formCategory };

		axios
			.put(
				"http://localhost:8080/api/inventory/category/" +
					categoryToUpdate.categoryId,
				payload
			)
			.then((resposne) => {
				const createdCategory = resposne.data;
				console.log(createdCategory);
				onUpdate(createdCategory);
				alert("Category updated succesfully");
			})
			.catch((error) => {
				console.error("failed to update a category " + error);
			});
	};

	return (
		<>
			<form>
				<label className="formLabel">Category</label>
				<input
					type="text"
					name="unit"
					value={formCategory}
					onChange={handleChange}
					className="formInput"
					placeholder="Drink..."
				/>
				<button className="submitBtn" onClick={handleSubmit}>
					Update
				</button>
			</form>
		</>
	);
}

export default CategoryUpdateForm;
