import axiosInstance from "../../api/AxiosInstance";
import { useState, useEffect } from "react";
function CategoryForm({ onAdd, onClose }) {
	const [formCategory, setFormCategory] = useState("");
	const [errors, setErrors] = useState({});

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
				if(error.response && error.response.status === 400){
					setErrors(error.response.data);
				}
				console.error("failed to create a category " + error);
			});
	};

	return (
		<>
			<form className="form">
				<label className="formLabel">Category</label>
				<input
					type="text"
					name="category"
					value={formCategory}
					onChange={handleChange}
					className="formInput"
					placeholder="Drink..."
				/>
				{errors.name && <p className="errorMessage">{errors.name}</p>}

				<button className="submitBtn" onClick={handleSubmit}>
					Add unit
				</button>
			</form>
		</>
	);
}

export default CategoryForm;
