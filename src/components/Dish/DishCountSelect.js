import { useState } from "react";

function DishCountSelect({handleMakeDish, errors}) {
    const [count, setCount] = useState();

    const handleChange = (event) => {
        setCount(event.target.value)
    }

    const handleSubmit = (event) =>{
        event.preventDefault();
        handleMakeDish(count);
        // onClose();
    }

    return (
        <form className="form">
            <label className="formLabel">Select the quantity of dishes to make</label>
            <input className="formInput" type="number" name="count" value={count} onChange={handleChange}/>

            {errors && <p className="errorMessage">{errors}</p>}

            <button className="submitBtn formButton" type="submit" onClick={handleSubmit}>Prepare</button>
        </form>
    )
}

export default DishCountSelect;