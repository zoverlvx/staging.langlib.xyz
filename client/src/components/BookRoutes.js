import React from "react";
import { Route } from "react-router-dom";

function Books(props) {
	const components = {
		"german": () => <div>German Books</div>,
		"french": () => <div>French Books</div>,
		"spanish": () => <div>Spanish Books</div>
 	};
	return components[props.language]();
}

export default function(props) {
	return props.languages.map(function(language) {
		const languagePath = language.name.toLowerCase();
		return (
			<div>
				<Route 
					path={`/${languagePath}`}
					render={(props) => <Books 
						language={languagePath} 
						{...props} 
					/>} 
				/>
			</div>
		);
	});
	
}
