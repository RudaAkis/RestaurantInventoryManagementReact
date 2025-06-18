import axiosInstance from "../../api/AxiosInstance";
import { useState, useEffect } from "react";
function VendorForm({ onAdd, onClose }) {
	const [formVendor, setFormVendor] = useState("");
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setFormVendor(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { name: formVendor };

		axiosInstance
			.post("http://localhost:8080/api/inventory/vendors", payload)
			.then((resposne) => {
				const createdVendor = resposne.data;
				console.log(createdVendor);
				onAdd(createdVendor);
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
				<label className="formLabel">Vendor</label>
				<input
					type="text"
					name="vendor"
					value={formVendor}
					onChange={handleChange}
					className="formInput"
					placeholder="Company LLC..."
				/>
				{errors.name && <p className="errorMessage">{errors.name}</p>}

				<button className="submitBtn" onClick={handleSubmit}>
					Add Vendor
				</button>
			</form>
		</>
	);
}

export default VendorForm;
