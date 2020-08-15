import React from "react";
import { NavLink } from "react-router-dom";
import useHover from "../utils/useHover.js";

export default function(props) {
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
