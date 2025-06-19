import "../Product/Form.css";
import { useState } from "react";
import axiosInstance from "../../api/AxiosInstance";

function UnitForm({ onClose, onAdd }) {
	const [formUnit, setFormUnit] = useState("");
	const [errors, setErrors] = useState({});

	const handleChange = (event) => {
		setFormUnit(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { name: formUnit };

		axiosInstance
			.post("http://localhost:8080/api/inventory/units", payload)
			.then((resposne) => {
				const createdUnit = resposne.data;
				onAdd(createdUnit);
				onClose();
			})
			.catch((error) => {
				if (error.response && error.response.status === 400){
					setErrors(error.response.data);
				}
				console.log("printing errors", errors)
				console.error("failed to create a unit " + error);
			});
	};

	return (
		<>
			<form className="form">
				<label className="formLabel">Unit of measure</label>
				<input
					type="text"
					name="unit"
					value={formUnit}
					onChange={handleChange}
					className="formInput"
					placeholder="kg..."
				/>
				{errors.name && <p className="errorMessage">{errors.name}</p>}

				<button className="submitBtn" onClick={handleSubmit}>
					Add unit
				</button>
			</form>
		</>
	);
}

export default UnitForm;
