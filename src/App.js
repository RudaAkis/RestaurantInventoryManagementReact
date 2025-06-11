import "./App.css";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Layout from "./pages/Layout";
import DishesPage from "./pages/DishesPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UnitPage from "./pages/UnitPage";
import CategoryPage from "./pages/CategoryPage";
import VendorPage from "./pages/VendorPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<LoginPage />} />

				<Route path="/app" element={<Layout />}>
					<Route path="dashboard" element={<HomePage />} />
					<Route path="products" element={<ProductPage />} />
					<Route path="dishes" element={<DishesPage />} />
					<Route path="units" element={<UnitPage />} />
					<Route path="categories" element={<CategoryPage />} />
					<Route path="vendors" element={<VendorPage />} />
					<Route path="users" element={<UserPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
