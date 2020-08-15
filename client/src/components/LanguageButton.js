import React from "react";
import { NavLink } from "react-router-dom";
import useHover from "../utils/useHover.js";

export default function(props) {
	const [hoverRef, isHovered] = useHover();
	const languagePath = props.language.name.toLowerCase();
	const style = {
		display: "flex",
		textDecoration: "none",
		background: "#999",
		//padding: "1em 2.4em",
		padding: "10px 20px",
		fontSize: ".9em",
		margin: "2em",
		color: "white",
		flexGrow: "1",
		textAlign: "center",
	};
	return (
		<div ref={hoverRef}>
			<NavLink 
				style={style}
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
