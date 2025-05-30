// ProductDropdownSearch.js
import { useState } from "react";
import "./DishForm.css";

function ProductDropdownSearch({ items, selectedItems, onSelect }) {
	const [query, setQuery] = useState("");

	const lowerQuery = query.toLowerCase();
	const filteredItems = items.filter(
		(item) =>
			item.name.toLowerCase().includes(lowerQuery) &&
			!selectedItems.some((sel) => sel.productId === item.productId)
	);

	return (
		<>
			<input
				type="text"
				className="dishFormField"
				placeholder="Search to add product..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>

			{query && ( // If query is not not or empty show the list
				<ul className="dropdown-list">
					{filteredItems.length === 0 ? ( //If list of items mathcing the query is 0, show nothing is found
						<li className="no-results">No results</li>
					) : (
						//Else create a list of items and display them from the filteredItems list
						filteredItems.map((item) => (
							<li
								className="productListItem"
								key={item.productId}
								onClick={() => {
									onSelect(item);
									setQuery(""); // reset input field after adding the item
								}}
							>
								+{item.name}
							</li>
						))
					)}
				</ul>
			)}
		</>
	);
}

export default ProductDropdownSearch;
