import React from "react";
import { NavLink, useLocation, useHistory, useParams } from "react-router-dom";
import useHover from "./utils/useHover.js";

export default function(props) {

	const path = props.path[0] !== "/" 
		? `/${props.path}` : props.path; 
	
	const [hoverRef, isHovered] = useHover();
	
	return (
		<div ref={hoverRef}>
			<NavLink
				style={props.style}
				to={path}	
			>
				{
					isHovered
						? props.item.onHoverText
						: props.item.defaultText
				}
			</NavLink>
		</div>
	);
}
