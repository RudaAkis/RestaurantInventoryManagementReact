import { useState, useEffect } from "react";
import "./ProductSearchBar.css";

function ProductSearchBar({ products, onFilter }) {
	const [query, setQuery] = useState("");

	useEffect(() => {
		const lowerQuery = query.toLowerCase(); //query in lower case letters
		const filtered = products.filter(
			(
				product //Filter the products where the product in lowercase matches the query in lower case
			) => product.name.toLowerCase().includes(lowerQuery)
		);
		onFilter(filtered); //Once the product list is filtered pass the list back to the ProductPage function for re-rendering based of the list
	}, [query, products, onFilter]);

	return (
		<div className="searchBar">
			<input
				className="searchInput"
				type="text"
				placeholder="Search products..."
				value={query} //Sets the value of the input to the query string from useState
				onChange={(e) => setQuery(e.target.value)} //Sets the query string on each key input a user does
			/>
		</div>
	);
}

export default ProductSearchBar;
