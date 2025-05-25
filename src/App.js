import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Layout from "./pages/Layout";
import DishesPage from "./pages/DishesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnitPage from "./pages/UnitPage";
import CategoryPage from "./pages/CategoryPage";
import VendorPage from "./pages/VendorPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="/dashboard" index element={<HomePage />} />
					<Route path="products" element={<ProductPage />} />
					<Route path="dishes" element={<DishesPage />} />
					<Route path="/units" element={<UnitPage />} />
					<Route path="/categories" element={<CategoryPage />} />
					<Route path="/vendors" element={<VendorPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
