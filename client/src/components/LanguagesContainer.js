import React from "react";
import LanguageButtons from "./LanguageButtons.js";

export default function(props) {
	return (
		<div>
			<LanguageButtons languages={props.languages} />
		</div>
	);
}
