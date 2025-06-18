import { useState } from "react";


function ProdcutRefillForm({refillProduct, closeModal}) {
    const [refillFormData, setRefillFormData] = useState({
        refillAmount: "",
        expiryDate: ""
    })
    const [refillAmount, setRefillAmount] = useState();

    const handleChange = (event) => {
		//Assign the name and the value from the input to the variables
		const { name, value } = event.target;
		//Set the form data where the name equals object property name and the value is the value from the input
		setRefillFormData((prev) => ({
			...prev, //Spread operator to reassign the same values to everything else in the form
			[name]: value,
		}));
	};

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            refillQuantity: refillFormData.refillAmount,
            updatedExpiryDate: refillFormData.expiryDate,
        }
        refillProduct(payload);
        closeModal();
    }
    return (
        <form className="form">
            <label className="formLabel">Enter the refill amount</label>
            <input className="formInput" type="number" name="refillAmount" value={refillFormData.refillAmount} onChange={handleChange}/>
            <label className="formLabel">Enter new Expiry date</label>
            <input className="formInput" type="datetime-local" name="expiryDate" value={refillFormData.expiryDate} onChange={handleChange}/>
            <button className="submitBtn" type="submit" onClick={handleSubmit}>Refill</button>
        </form>
    )
}

export default ProdcutRefillForm;