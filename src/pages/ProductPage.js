import "./PagesCSS/ProductPage.css";
import Product from "../components/Product";
import ProductForm from "../components/ProductForm";
import AddProductButton from "../components/AddProductButton";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import axios from "axios";
function ProductPage() {
	const [showModal, setShowModal] = useState(false);
	const [products, setProducts] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:8080/api/inventory/products/all")
			.then((response) => {
				setProducts(response.data);
				console.log(response.data);
			})
			.catch((error) => {
				console.error("Failed to fetch the products " + error);
			});
	}, []);

	const removeProductLocally = (deletedId) => {
		setProducts((prev) => prev.filter((p) => p.productId !== deletedId));
	};

	const addProductLocally = (product) => {
		setProducts((previousProducts) => [...previousProducts, product]);
	};

	return (
		<>
			<div className="productMainContainer">
				<AddProductButton setShowModal={setShowModal} />
				{products.map((p) => (
					<Product product={p} onDelete={removeProductLocally} />
				))}
				{showModal && (
					<Modal
						onClose={() => setShowModal(false)}
						child={
							<ProductForm
								onClose={() => setShowModal(false)}
								onAdd={addProductLocally}
							/>
						}
					/>
				)}
			</div>
		</>
	);
}

export default ProductPage;
