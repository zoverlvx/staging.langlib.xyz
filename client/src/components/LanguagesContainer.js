import React from "react";
import LanguageButtons from "./LanguageButtons.js";

export default function(props) {
	const style = {
		margin: "10px auto",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
		maxWidth: "320px"
	};
	return (
		<div style={style}>
			<LanguageButtons languages={props.languages} />
		</div>
	);
}
