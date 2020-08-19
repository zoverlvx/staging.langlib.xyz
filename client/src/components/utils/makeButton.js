import React from "react";
import Button from "../Button.js";

export default function(item, i) {
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
	return <Button key={`${item}-${i}`} path={item.path} item={item} style={style}/>
}
