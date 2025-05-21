import { Outlet, Link } from "react-router-dom";
import "../App.css";
import "./PagesCSS/Layout.css";
import LoginRegisterButton from "../components/LoginRegisterButton";
import "../components/LoginButton.css";

const Layout = () => {
	return (
		<>
			<nav>
				<h1 className="pro">PRO Manager</h1>

				<ul>
					<li>
						<Link to="/home">Home</Link>
					</li>
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/dishes">Dishes</Link>
					</li>
				</ul>

				<LoginRegisterButton />
			</nav>

			<Outlet />
		</>
	);
};

export default Layout;
