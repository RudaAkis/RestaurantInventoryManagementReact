import "../pages/PagesCSS/DishPage.css";
import Dish from "../components/Dish";
function DishesPage() {
	return (
		<>
			<div className="dishMainContainer">
				<Dish />
				<Dish />
				<Dish />
				<Dish />
			</div>
		</>
	);
}

export default DishesPage;
