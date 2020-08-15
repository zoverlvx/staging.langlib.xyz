import React from "react";
import Book from "./Book.js";
import { 
	BookRoutes, 
	LanguagesContainer, 
	LanguageButtons, 
	LanguageButton
} from "./components";
import { NavLink, Route } from "react-router-dom";
import useHover from "./utils/useHover.js";



const languages = [
	{
		name: "German",
		nativeName: "Deutsch"
	},
	{
		name: "French",
		nativeName: "Français"
	},
	{
		name: "Spanish",
		nativeName: "Español"
	}
];

export default function() {
	return (
		<div>
			<Route 
				exact path="/" 
				render={function(props) {
					return (
						<LanguagesContainer 
							languages={languages}
							{...props} 
						/>
					);
				}}
			/>
			<BookRoutes languages={languages} />
		</div>
	);
}
