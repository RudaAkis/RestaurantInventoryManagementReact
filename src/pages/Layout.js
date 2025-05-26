import { Outlet, Link } from "react-router-dom";
import "../App.css";
import "./PagesCSS/Layout.css";
import LoginRegisterButton from "../components/Login/LoginRegisterButton";
import "../components/Login/LoginButton.css";

const Layout = () => {
	return (
		<>
			<nav>
				<h1 className="pro">PRO Manager</h1>

				<ul>
					<li>
						<Link to="/dashboard">Dashboard</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/dishes">Dishes</Link>
					</li>
					<li>
						<Link to="/units">Units</Link>
					</li>
					<li>
						<Link to="/categories">Categories</Link>
					</li>
					<li>
						<Link to="/vendors">Vendors</Link>
					</li>
				</ul>

				<LoginRegisterButton />
			</nav>

			<Outlet />
		</>
	);
};

export default Layout;
