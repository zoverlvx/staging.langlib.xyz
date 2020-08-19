import React from "react";
import {
	Book,
	Container
} from "./components";
import { Route } from "react-router-dom";

export default function() {

	const style = {
		margin: "10px auto",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		//maxWidth: "320px"
		maxWidth: "400px"		
	};

	return (
		<div>
			<Route 
				exact path="/" 
				render={function(props) {
					return (
						<Container
							style={style} 
							req="/"
							mapping={function(language) {
								const path = language.name.toLowerCase();
								return {
									path,
									defaultText: language.name,
									onHoverText: language.nativeName
								};
							}}
							type="languages"
						/>
					);
				}}
			/>
			<Route
				exact path="/:language"
				render={function(props) {
					const { url } = props.match;
					return (
						<Container 
							style={style}
							req={url}
							type="books"
							mapping={function(book) {
								const bookPath = book.name
									.toLowerCase()
									.replace(/ /g, "-");
								return {
									path: `${url}/${bookPath}`,
									defaultText: book.nativeName,
									onHoverText: book.name
								};
							}}
						/>
					);
				}}
			/>
			<Route 
				exact path="/:language/:book/:number?"
				render={function(props) {
					return <Book />;
				}}
			/>
		</div>
	);
}



	
