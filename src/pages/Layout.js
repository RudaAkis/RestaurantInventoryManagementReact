import { Outlet, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import "./PagesCSS/Layout.css";
import LoginRegisterButton from "../components/Login/LoginRegisterButton";
import "../components/Login/LoginButton.css";
import { getUserFromToken, logout } from "../utils/authUtils";

const Layout = () => {
	const [username, setUsername] = useState("");

	useEffect(() => {
		const user = getUserFromToken();
		if (user) {
			setUsername(user);
		} else {
			logout();
		}
	}, []);

	return (
		<>
			<nav>
				<h1 className="pro">PRO Manager</h1>

				<ul>
					<li>
						<Link to="/app/dashboard">Dashboard</Link>
					</li>
					<li>
						<Link to="/app/products">Products</Link>
					</li>
					<li>
						<Link to="/app/dishes">Dishes</Link>
					</li>
					<li>
						<Link to="/app/units">Units</Link>
					</li>
					<li>
						<Link to="/app/categories">Categories</Link>
					</li>
					<li>
						<Link to="/app/vendors">Vendors</Link>
					</li>
					{username && (
						<li className="usernameText">
							| Welcome, {getUserFromToken()}
						</li>
					)}
				</ul>
			</nav>

			<Outlet />
		</>
	);
};

export default Layout;
