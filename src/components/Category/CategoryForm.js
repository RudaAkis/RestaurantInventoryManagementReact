import axiosInstance from "../../api/AxiosInstance";
import { useState, useEffect } from "react";
function CategoryForm({ onAdd, onClose }) {
	const [formCategory, setFormCategory] = useState("");

	const handleChange = (event) => {
		setFormCategory(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { name: formCategory };

		axiosInstance
			.post("http://localhost:8080/api/inventory/category", payload)
			.then((resposne) => {
				const createdCategory = resposne.data;
				console.log(createdCategory);
				onAdd(createdCategory);
				onClose();
			})
			.catch((error) => {
				console.error("failed to create a category " + error);
			});
	};

	return (
		<>
			<form>
				<label className="formLabel">Category</label>
				<input
					type="text"
					name="category"
					value={formCategory}
					onChange={handleChange}
					className="formInput"
					placeholder="Drink..."
				/>
				<button className="submitBtn" onClick={handleSubmit}>
					Add unit
				</button>
			</form>
		</>
	);
}

export default CategoryForm;
