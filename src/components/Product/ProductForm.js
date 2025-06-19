import { useEffect, useState } from "react";
import "./Form.css";
import axiosInstance from "../../api/AxiosInstance";

function ProductForm({ onClose, onAdd }) {
	const [units, setUnits] = useState([]);
	const [categories, setCategories] = useState([]);
	const [vendors, setVendors] = useState([]);
	const [formData, setFormData] = useState({
		name: "",
		quantity: "",
		unitOfMeasureId: "",
		expiryDate: "",
		categoryId: "",
		vendorId: "",
		price: "",
	});
	const [errors, setErrors] = useState({});

	//UseEffect use to fetch the Units, Categories and Vendors from back end
	useEffect(() => {
		//Sets Units
		axiosInstance
			.get("http://localhost:8080/api/inventory/units/all")
			.then((response) => {
				setUnits(response.data);
			})
			.catch((error) => {
				console.error("Failed to fetch unit " + error);
			});
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

	const handleChange = (event) => {
		//Assign the name and the value from the input to the variables
		const { name, value } = event.target;//Deconstruct the target to field name and the value
		//Set the form data where the name equals object property name and the value is the value from the input
		setFormData((prev) => ({
			...prev, //Spread operator to reassign the same values to everything else in the form
			[name]: value,
		}));
	};

	//Preassign the categoryId as the first options since it seems react by default leaves it an empty string
	useEffect(() => {
		if (categories.length > 0 && formData.categoryId === "") {
			setFormData((prev) => ({
				...prev,
				categoryId: categories[0].categoryId,
			}));
		}
	}, [categories]);

	//Preassign the vendorId as the first options since it seems react by default leaves it an empty string
	useEffect(() => {
		if (vendors.length > 0 && formData.vendorId === "") {
			setFormData((prev) => ({
				...prev,
				vendorId: vendors[0].vendorId,
			}));
		}
	}, [vendors]);

	//Preassign the unitofMeasureId as the first options since it seems react by default leaves it an empty string
	useEffect(() => {
		if (units.length > 0 && formData.unitOfMeasureId === "") {
			setFormData((prev) => ({
				...prev,
				unitOfMeasureId: units[0].unitId,
			}));
		}
	}, [units]);

	const handleSubmit = (event) => {
		event.preventDefault();

		const payload = {
			...formData,
			quantity: Number(formData.quantity),
			unitOfMeasureId: Number(formData.unitOfMeasureId),
			categoryId: Number(formData.categoryId),
			vendorId: Number(formData.vendorId),
			price: Number(formData.price),
			expiryDate: formData.expiryDate,
		};
		axiosInstance
			.post("http://localhost:8080/api/inventory/products", payload)
			.then((response) => {
				const createdProduct = response.data;
				onAdd(createdProduct);
				onClose();
			})
			.catch((error) => {
				if (error.response && error.response.status === 400) {
      				setErrors(error.response.data);//Create the object with key as the name of the field and the value as the error message
    			}
				console.error("Error creating product:", error);
			});
	};

	return (
		<>
			<form className="form">
				<label className="formLabel">Product name</label>
				<input
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="formInput"
					type="text"
					placeholder="Cheese..."
				/>
				{errors.name && <p className="errorMessage">{errors.name}</p>}

				<label className="formLabel">Quantity</label>
				<input
					name="quantity"
					value={formData.quantity}
					onChange={handleChange}
					className="formInput"
					type="number"
					placeholder="2.4..."
				/>
				{errors.quantity && <p className="errorMessage">{errors.quantity}</p>}

				<label className="formLabel">Unit of measure</label>
				<select
					name="unitOfMeasureId"
					value={formData.unitOfMeasureId}
					onChange={handleChange}
					className="formInput"
				>
					{units.map((unit) => (
						<option key={unit.unitId} value={unit.unitId}>
							{unit.name}
						</option>
					))}
				</select>
				{errors.unitOfMeasureId && <p className="errorMessage">{errors.unitOfMeasureId}</p>}

				<label className="formLabel">Expiration Date</label>
				<input
					name="expiryDate"
					value={formData.expiryDate}
					onChange={handleChange}
					className="formInput"
					type="datetime-local"
				/>
				{errors.expiryDate && <p className="errorMessage">{errors.expiryDate}</p>}

				<label className="formLabel">Category</label>
				<select
					name="categoryId"
					value={formData.categoryId}
					onChange={handleChange}
					className="formInput"
				>
					{categories.map((category) => (
						<option
							key={category.categoryId}
							value={category.categoryId}
						>
							{category.name}
						</option>
					))}
				</select>
				{errors.categoryId && <p className="errorMessage">{errors.categoryId}</p>}

				<label className="formLabel">Vendor</label>
				<select
					name="vendorId"
					value={formData.vendorId}
					onChange={handleChange}
					className="formInput"
				>
					{vendors.map((vendor) => (
						<option key={vendor.vendorId} value={vendor.vendorId}>
							{vendor.name}
						</option>
					))}
				</select>
				{errors.vendorId && <p className="errorMessage">{errors.vendorId}</p>}

				<label className="formLabel">Price</label>
				<input
					name="price"
					value={formData.price}
					onChange={handleChange}
					className="formInput"
					type="number"
				/>
				{errors.price && <p className="errorMessage">{errors.price}</p>}

				<button className="submitBtn" onClick={handleSubmit}>
					Submit
				</button>
			</form>
		</>
	);
}

export default ProductForm;
