import React from "react";
import {
	Container,
	Button
} from "./components";
import {Route} from "react-router-dom";
import axios from "axios";
import {makeUseAxios} from "axios-hooks";
import config from "./config"

const { baseURL } = config;

// set up base url
const useAxios = makeUseAxios({
	axios: axios.create({baseURL})
});


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
							{...props} 
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
							{...props}
						/>
					);
				}}
			/>
			<Route 
				path="/:language/:book"
				render={function(props) {
					return <div>Check console</div>;
				}}
			/>
		</div>
	);
}



	
