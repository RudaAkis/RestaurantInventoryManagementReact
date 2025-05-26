import axios from "axios";
import AddButton from "../components/AddButton";
import { useState, useEffect } from "react";
import Category from "../components/Category/Category";
import CategoryForm from "../components/Category/CategoryForm";
import Modal from "../components/Modal";
import "../components/Unit.css";
import "./PagesCSS/ProductPage.css";
function CategoryPage() {
	const [categories, setCategories] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const removeCategoryLocally = (deletedId) => {
		//Filter the list to keep only the Id's that dont match
		setCategories((prev) =>
			prev.filter((category) => category.categoryId !== deletedId)
		);
	};

	const addCategoryLocally = (category) => {
		setCategories((prev) => [...prev, category]);
	};
	const updateCategoryLocally = (updatedCategory) => {
		setCategories((prev) =>
			prev.map((category) =>
				category.categoryId === updatedCategory.categoryId
					? updatedCategory
					: category
			)
		);
	};

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/inventory/category/all")
			.then((response) => {
				setCategories(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("failled to fetch units " + error);
			});
	}, []);

	return (
		<div className="mainContainer">
			<AddButton setShowModal={setShowModal} />
			{categories.map((cat) => (
				<Category
					category={cat}
					onDelete={removeCategoryLocally}
					onUpdate={updateCategoryLocally}
				/>
			))}
			{showModal && (
				<Modal
					onClose={() => setShowModal(false)}
					child={
						<CategoryForm
							onClose={() => setShowModal(false)}
							onAdd={addCategoryLocally}
						/>
					}
				/>
			)}
		</div>
	);
}

export default CategoryPage;
