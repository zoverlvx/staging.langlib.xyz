import React from "react";
import LanguageButton from "./LanguageButton.js";

export default function(props) {
	return props.languages.map(function(language, i) {
		return <LanguageButton language={language} />;
	})
}
