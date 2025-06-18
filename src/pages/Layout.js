import { Outlet, NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import "./PagesCSS/Layout.css";
import LoginRegisterButton from "../components/Login/LoginRegisterButton";
import "../components/Login/LoginButton.css";
import { getUserFromToken, logout } from "../utils/authUtils";
import logoutIcon from "../images/logoutIcon.png";

const Layout = () => {
	const [username, setUsername] = useState("");
	const user = getUserFromToken();
	useEffect(() => {
		if (user) {
			setUsername(user?.username);
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
						<NavLink 
							to="/app/dashboard" 
							className={({ isActive }) => isActive ? 'active-link' : ''}
						>
							Dashboard
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/app/products" 
							className={({ isActive }) => isActive ? 'active-link' : ''}
						>
							Products
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/app/dishes" 
							className={({ isActive }) => isActive ? 'active-link' : ''}
						>
							Dishes
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/app/units" 
							className={({ isActive }) => isActive ? 'active-link' : ''}
						>
							Units
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/app/categories" 
							className={({ isActive }) => isActive ? 'active-link' : ''}
						>
							Categories
						</NavLink>
					</li>
					<li>
						<NavLink 
							to="/app/vendors" 
							className={({ isActive }) => isActive ? 'active-link' : ''}
						>
							Vendors
						</NavLink>
					</li>
					{user?.role === "ADMIN" && (
						<li>
							<NavLink  
								to="/app/users"
								className={({ isActive }) => isActive ? 'active-link' : ''}
							>
								Users	
							</NavLink>
						</li>
					)}
					{username && (
						<>
							<li className="usernameText">| Welcome, {username}</li>
							<button 
								className="logoutBtn" 
								onClick={logout}> 
								<img 
									className="logoutIconImage" 
									src={logoutIcon} 
									alt="-"/> 
							</button>
						</>
					)}
				</ul>
			</nav>

			<Outlet />
		</>
	);
};

export default Layout;
