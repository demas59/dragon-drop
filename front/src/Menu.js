import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Menu() {
	return (
		<header>
			<nav>
				<h1 className="logo">
					Reac<em>Tube</em>
				</h1>
				<ul className="mainMenu">
					<li>
						<NavLink to="/">Vidéos</NavLink>
					</li>
					<li>
						<NavLink to="/videos/new">Ajouter</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}
