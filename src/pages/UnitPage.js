import { useState, useEffect } from "react";
import "../components/Unit.css";
import Unit from "../components/Unit";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import UnitForm from "../components/UnitForm";
import axiosInstance from "../api/AxiosInstance";
import { getUserFromToken } from "../utils/authUtils";
function UnitPage() {
	const [units, setUnits] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const user = getUserFromToken();

	const removeUnitLocally = (deletedId) => {
		//Filter the list to keep only the Id's that dont match
		setUnits((prev) => prev.filter((p) => p.unitId !== deletedId));
	};

	const addUnitLocally = (unit) => {
		setUnits((previousUnits) => [...previousUnits, unit]);
	};
	const updateUnitLocally = (updatedUnit) => {
		setUnits((prev) =>
			prev.map((unit) =>
				unit.unitId === updatedUnit.unitId ? updatedUnit : unit
			)
		);
	};

	useEffect(() => {
		axiosInstance
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
			{user?.role === "ADMIN" && (
				<AddButton setShowModal={setShowModal} />
			)}

			{units.map((unit) => (
				<Unit
					unit={unit}
					onDelete={removeUnitLocally}
					onUpdate={updateUnitLocally}
				/>
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
