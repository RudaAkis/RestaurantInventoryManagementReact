import { useState, useEffect } from "react";
import axiosInstance from "../../api/AxiosInstance";
import './ProductFilterBar.css';

function ProductFilterBar({ onFilter, onReset }) {
	const [categoryId, setCategoryId] = useState("");
	const [vendorId, setVendorId] = useState("");
	const [daysBeforeExpiry, setDaysBeforeExpiry] = useState("");
	const [sort, setSort] = useState("");
	const [order, setOrder] = useState("asc");
	const [categories, setCategories] = useState([]);
	const [vendors, setVendors] = useState([]);

	useEffect(() => {
		//Sets Categories
		axiosInstance
			.get("http://localhost:8080/api/inventory/category/all")
			.then((response) => {
				setCategories(response.data);
			})
			.catch((error) => {
				console.error("Failed to fetch Categories " + error);
			});
		//Sets vendors
		axiosInstance
			.get("http://localhost:8080/api/inventory/vendors/all")
			.then((response) => {
				setVendors(response.data);
			})
			.catch((error) => {
				console.error("failed to fetch vendors " + error);
			});
	}, []);

	// Call this when the "Filter" button is clicked
	const handleApplyFilter = () => {
		const params = {};

		if (categoryId) params.categoryId = categoryId;
		if (vendorId) params.vendorId = vendorId;
		if (daysBeforeExpiry) params.daysBeforeExpiry = daysBeforeExpiry;
		if (sort) params.sort = sort;
		if (order) params.order = order;

		onFilter(params);
	};

	return (
		<div className="filterBar">
			<select
				className="filterOption"
				value={categoryId}
				onChange={(e) => setCategoryId(e.target.value)}
			>
				<option value="">All Categories</option>
				{categories.map((category) => (
					<option
						key={category.categoryId}
						value={category.categoryId}
					>
						{category.name}
					</option>
				))}
			</select>

			<select
				className="filterOption"
				value={vendorId}
				onChange={(e) => setVendorId(e.target.value)}
			>
				<option value="">All Vendors</option>
				{vendors.map((vendor) => (
					<option key={vendor.vendorId} value={vendor.vendorId}>
						{vendor.name}
					</option>
				))}
			</select>

			<input
				className="filterOption"
				type="number"
				placeholder="Days Before Expiry"
				value={daysBeforeExpiry}
				onChange={(e) => setDaysBeforeExpiry(e.target.value)}
			/>

			<select className="filterOption" value={sort} onChange={(e) => setSort(e.target.value)}>
				<option value="">No Sorting</option>
				<option value="expiryDate">Expiry Date</option>
				<option value="name">Name</option>
			</select>

			<select className="filterOption" value={order} onChange={(e) => setOrder(e.target.value)}>
				<option value="asc">Ascending</option>
				<option value="desc">Descending</option>
			</select>

			<button className="filterOption, filterButton" onClick={handleApplyFilter}>Apply</button>
			<button className="filterOption, filterButton" onClick={onReset}>Reset Filters</button>
		</div>
	);
}

export default ProductFilterBar;

