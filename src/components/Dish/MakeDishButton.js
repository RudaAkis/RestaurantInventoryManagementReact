import "./Dish.css";

function MakeDishButton({ handleMakeDish }) {
	return (
		<>
			<button className="productButton" onClick={handleMakeDish}>
				Prepare Dish
			</button>
		</>
	);
}

export default MakeDishButton;
