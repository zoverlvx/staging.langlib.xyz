import React from "react";
import BookButtons from "./BookButtons.js";

export default function(props) {
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
		<div style={style}>
			<BookButtons languages={props.books} />
		</div>
	);
}
