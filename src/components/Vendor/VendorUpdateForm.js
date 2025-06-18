import axiosInstance from "../../api/AxiosInstance";
import { useState, useEffect } from "react";

function VendorUpdateForm({ vendorToUpdate, onUpdate }) {
	const [formVendor, setFormVendor] = useState("");
	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (vendorToUpdate !== null) {
			setFormVendor(vendorToUpdate.name);
		}
	}, []);

	const handleChange = (event) => {
		setFormVendor(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { name: formVendor };

		axiosInstance
			.put(
				"http://localhost:8080/api/inventory/vendors/" +
					vendorToUpdate.vendorId,
				payload
			)
			.then((response) => {
				const updatedVendor = response.data;
				console.log(updatedVendor);
				onUpdate(updatedVendor);
				alert("Category updated succesfully");
			})
			.catch((error) => {
				if(error.response && error.response.status === 400){
					setErrors(error.response.data);
				}
				console.error("failed to update a category " + error);
			});
	};

	return (
		<>
			<form className="form">
				<label className="formLabel">Category</label>
				<input
					type="text"
					name="vendor"
					value={formVendor}
					onChange={handleChange}
					className="formInput"
					placeholder="Company LLc..."
				/>
				{errors.name && <p className="errorMessage">{errors.name}</p>}
				<button className="submitBtn" onClick={handleSubmit}>
					Update
				</button>
			</form>
		</>
	);
}

export default VendorUpdateForm;
