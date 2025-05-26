import axios from "axios";
import AddButton from "../components/AddButton";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import "../components/Unit.css";
import "./PagesCSS/ProductPage.css";
import Vendor from "../components/Vendor/Vendor";
import VendorForm from "../components/Vendor/VendorForm";
function VendorPage() {
	const [vendors, setVendors] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const removeCategoryLocally = (deletedId) => {
		//Filter the list to keep only the Id's that dont match
		setVendors((prev) =>
			prev.filter((vendor) => vendor.vendorId !== deletedId)
		);
	};

	const addVendorLocally = (vendor) => {
		setVendors((prev) => [...prev, vendor]);
	};
	const updateCategoryLocally = (updatedVendor) => {
		setVendors((prev) =>
			prev.map((vendor) =>
				vendor.vendorId === updatedVendor.vendorId
					? updatedVendor
					: vendor
			)
		);
	};

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/inventory/vendors/all")
			.then((response) => {
				setVendors(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("failled to fetch units " + error);
			});
	}, []);

	return (
		<div className="mainContainer">
			<AddButton setShowModal={setShowModal} />
			{vendors.map((vendor) => (
				<Vendor
					vendor={vendor}
					onDelete={removeCategoryLocally}
					onUpdate={updateCategoryLocally}
				/>
			))}
			{showModal && (
				<Modal
					onClose={() => setShowModal(false)}
					child={
						<VendorForm
							onClose={() => setShowModal(false)}
							onAdd={addVendorLocally}
						/>
					}
				/>
			)}
		</div>
	);
}

export default VendorPage;
