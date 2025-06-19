import { useEffect, useState } from "react";
import axiosInstance from "../../api/AxiosInstance";

function UnitUpdateForm({ unitToUpdate, onUpdate }) {
	const [formUnit, setFormUnit] = useState();
	const [errors, setErrors] = useState({});

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
		axiosInstance
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
				if(error.response && error.response.status === 400 ){
					setErrors(error.response.data);
				}
				console.error("failed to update unit of measure " + error);
			});
	};

	return (
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
				Update
			</button>
		</form>
	);
}

export default UnitUpdateForm;
