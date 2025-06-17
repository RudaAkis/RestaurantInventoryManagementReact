import { useState } from "react";
import "./Dish.css";
import Modal from "../Modal";
import DishCountSelect from "./DishCountSelect";

function MakeDishButton({ handleMakeDish, errors, setErrors}) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = () =>{
		setShowModal(true);
		setErrors("");
	}

	return (
		<>
			<button className="productButton" onClick={handleClick}>
				Prepare Dish
			</button>

			{showModal && (
				<Modal 
					onClose={() => setShowModal(false)} 
					child={	
						<DishCountSelect 
							handleMakeDish={handleMakeDish} 
							onClose={() => setShowModal(false)} 
					errors={errors}/>} 
				/>

			)}
		</>
	);
}

export default MakeDishButton;
