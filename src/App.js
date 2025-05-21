import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Layout from "./pages/Layout";
import DishesPage from "./pages/DishesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/home" index element={<HomePage />} />
					<Route path="products" element={<ProductPage />} />
					<Route path="dishes" element={<DishesPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
