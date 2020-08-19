import React from "react";
import { useParams } from "react-router-dom";
import makeButton from "./utils/makeButton.js";
import { useAxios } from "./utils/useAxios.js";

export default function(props) {

	if (
		props.req 
		&& props.type 
		&& props.mapping
	) {
		
		const [{data, loading, error}] = useAxios(props.req);

		if (loading) {
			
			return <div>LOADING...</div>;
		
		} else if (error) {
		
			return <div>Error :-(</div>;	
		
		} else {
	
			const convertedData = data[props.type].map(props.mapping);
		
			return (
				<div 
					style={props.style}
				>
					{convertedData.map(makeButton)}
				</div>
			);
		}
		
    } else if (props.items) {

		return (
			<div 
				style={props.style}
			>
				{props.items.map(makeButton)}
			</div>
		);
	}

	
}
