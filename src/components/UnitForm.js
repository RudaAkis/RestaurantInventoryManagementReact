import "./Product/Form.css";
import { useState } from "react";
import axios from "axios";

function UnitForm({ onClose, onAdd }) {
	const [formUnit, setFormUnit] = useState("");

	const handleChange = (event) => {
		setFormUnit(event.target.value);
	};
	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = { name: formUnit };

		axios
			.post("http://localhost:8080/api/inventory/units", payload)
			.then((resposne) => {
				const createdUnit = resposne.data;
				onAdd(createdUnit);
				onClose();
			})
			.catch((error) => {
				console.error("failed to create a unit " + error);
			});
	};

	return (
		<>
			<form>
				<label className="formLabel">Unit of measure</label>
				<input
					type="text"
					name="unit"
					value={formUnit}
					onChange={handleChange}
					className="formInput"
					placeholder="kg..."
				/>
				<button className="submitBtn" onClick={handleSubmit}>
					Add unit
				</button>
			</form>
		</>
	);
}

export default UnitForm;
