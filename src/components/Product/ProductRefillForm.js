import { useState } from "react";


function ProdcutRefillForm({refillProduct, closeModal}) {
    const [refillAmount, setRefillAmount] = useState();

    const handleChange = (event) =>{
        setRefillAmount(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        refillProduct(refillAmount);
        closeModal();
    }
    return (
        <form>
            <label className="formLabel">Enter the refill amount</label>
            <input className="formInput" type="number" name="refillAmount" value={refillAmount} onChange={handleChange}/>
            <button className="submitBtn" type="submit" onClick={handleSubmit}>Refill</button>
        </form>
    )
}

export default ProdcutRefillForm;