import { useEffect, useState } from "react";
import axios from "axios";

function UnitUpdateForm({ unitToUpdate, onUpdate }) {
	const [formUnit, setFormUnit] = useState();

	useEffect(() => {
		if (unitToUpdate !== null) {
			setFormUnit(unitToUpdate.name);
		}
	}, [unitToUpdate]);

	const handleChange = (event) => {
		setFormUnit(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const payload = { name: formUnit };
		axios
			.put(
				"http://localhost:8080/api/inventory/units/" +
					unitToUpdate.unitId,
				payload
			)
			.then((response) => {
				const updatedUnit = response.data;
				onUpdate(updatedUnit);
				alert("Unit of measure updated");
			})
			.catch((error) => {
				console.error("failed to update unit of measure " + error);
			});
	};

	return (
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
				Update
			</button>
		</form>
	);
}

export default UnitUpdateForm;
