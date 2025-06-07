import "./PagesCSS/ProductPage.css";
import Product from "../components/Product/Product.js";
import ProductForm from "../components/Product/ProductForm";
import AddButton from "../components/AddButton";
import Modal from "../components/Modal";
import ProductSearchBar from "../components/Product/ProductSearchBar.js";
import { useEffect, useState } from "react";
import AxiosInstance from "../api/AxiosInstance.js";


function ProductPage() {
	const [showModal, setShowModal] = useState(false);
	const [products, setProducts] = useState([]); // Full list of all products
	const [filteredProducts, setFilteredProducts] = useState([]); // Current selection of products after filtering will be done

	useEffect(() => {
		AxiosInstance.get("http://localhost:8080/api/inventory/products/all")
			.then((response) => {
				setProducts(response.data);
				setFilteredProducts(response.data); //Set both full list and filtered list as all products
			})
			.catch((error) => {
				console.error("Failed to fetch the products: " + error);
			});
	}, []);

	const removeProductLocally = (deletedId) => {
		setProducts((prev) => prev.filter((p) => p.productId !== deletedId));
		setFilteredProducts((prev) =>
			prev.filter((p) => p.productId !== deletedId)
		);
	};

	const addProductLocally = (product) => {
		setProducts((prev) => [...prev, product]);
		setFilteredProducts((prev) => [...prev, product]);
	};

	const updateProductLocally = (updatedProduct) => {
		setProducts((prev) =>
			prev.map((product) =>
				product.productId === updatedProduct.productId
					? updatedProduct
					: product
			)
		);
		setFilteredProducts((prev) =>
			prev.map((product) =>
				product.productId === updatedProduct.productId
					? updatedProduct
					: product
			)
		);
	};

	return (
		<div className="mainContainer">
			<AddButton setShowModal={setShowModal} />

			<ProductSearchBar
				products={products} //Passing the full list of all products
				onFilter={setFilteredProducts} //When on filter is called set the filtered products that is displayed
				placeholder="Search products..."
			/>

			{filteredProducts.length === 0 ? (
				<p>No results found.</p>
			) : (
				filteredProducts.map((p) => (
					<Product
						key={p.productId}
						product={p}
						onDelete={removeProductLocally}
						onUpdate={updateProductLocally}
					/>
				))
			)}

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
	);
}

export default ProductPage;
