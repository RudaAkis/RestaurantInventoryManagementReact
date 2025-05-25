import { useState, useEffect } from "react";
import axios from "axios";
import "../components/Unit.css";
import Unit from "../components/Unit";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import UnitForm from "../components/UnitForm";
function UnitPage() {
	const [units, setUnits] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const removeUnitLocally = (deletedId) => {
		//Filter the list to keep only the Id's that dont match
		setUnits((prev) => prev.filter((p) => p.unitId !== deletedId));
	};

	const addUnitLocally = (unit) => {
		setUnits((previousUnits) => [...previousUnits, unit]);
	};

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/inventory/units/all")
			.then((response) => {
				setUnits(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("failled to fetch units " + error);
			});
	}, []);

	return (
		<div className="mainContainer">
			<AddButton setShowModal={setShowModal} />
			{units.map((unit) => (
				<Unit unit={unit} onDelete={removeUnitLocally} />
			))}
			{showModal && (
				<Modal
					onClose={() => setShowModal(false)}
					child={
						<UnitForm
							onClose={() => setShowModal(false)}
							onAdd={addUnitLocally}
						/>
					}
				/>
			)}
		</div>
	);
}

export default UnitPage;
