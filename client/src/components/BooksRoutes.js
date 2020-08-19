import React from "react";
import { Route } from "react-router-dom";

function Books(props) {
	const components = {
		"german": () => <div>German</div>,
		"french": () => <div>French coming soon!</div>,
		"spanish": () => <div>Spanish coming soon!</div>,
		"italian": () => <div>Italian coming soon!</div>,
		"portuguese": () => <div>Portuguese coming soon!</div>,
		"russian": () => <div>Russian coming soon!</div>,
		"dutch": () => <div>Dutch coming soon!</div>
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
