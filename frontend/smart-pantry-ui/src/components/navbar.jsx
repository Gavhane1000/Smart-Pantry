import React from "react";
import './navbar.css';
import { useTheme } from "../context/context";

function Navbar() {
const { darkMode, toggleTheme } = useTheme();

return (
<>
	<div className="navbar">
		<div className="icon">Smart Pantry</div>

		<div className="search">
			<input type="text" placeholder="Search " className="search-input"/>
		</div>

		<div className="mode">
		<label className="switch">
			<input type="checkbox" onChange={toggleTheme} checked={darkMode} />
				<span className="slider round"></span>
		</label>
		</div>
	</div>
</>
);
}

export default Navbar;
