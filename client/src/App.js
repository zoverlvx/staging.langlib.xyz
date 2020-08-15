import React from "react";
import Book from "./Book.js";
import { NavLink, Route } from "react-router-dom";
import useHover from "./utils/useHover.js";

function books(language) {
	const components = {
		"german": () => <div>German Books</div>,
		"french": () => <div>French Books</div>,
		"spanish": () => <div>Spanish Books</div>
 	};
	return components[language]();

}

function BookRoutes(props) {
	return props.languages.map(function(language) {
		const languagePath = language.name.toLowerCase();
		return (
			<div>
				<Route 
					path={`/${languagePath}`}
					render={(props) => books(languagePath)} 
				/>
			</div>
		);
	});
	
}

function LanguagesContainer(props) {
	return (
		<div>
			<LanguageButtons languages={props.languages} />
		</div>
	);
}

function LanguageButton(props) {
	const [hoverRef, isHovered] = useHover();
	const languagePath = props.language.name.toLowerCase();
	return (
		<div ref={hoverRef}>
			<NavLink 
				to={`/${languagePath}`}
			>
				{
					isHovered 
						? props.language.nativeName 
						: props.language.name
				}
			</NavLink>				
		</div>
	);
}

function LanguageButtons(props) {
	return props.languages.map(function(language, i) {
		return <LanguageButton language={language} />;
	})
}

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
