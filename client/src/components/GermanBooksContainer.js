import React from "react";
import BookButtons from "./BookButtons.js";

function GermanBooksContainer(props) {
	const style = {
		margin: "10px auto",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		//maxWidth: "320px"
		maxWidth: "400px"
	};
	const books = [
		{
			name: "The Earthquake in Chile",
			nativeName: "Das Erdbeben in Chili"
		}
	]; 
	return (
		<div style={style}>
			<BookButtons {...props} books={books} />
		</div>
	);
}

export default GermanBooksContainer;

