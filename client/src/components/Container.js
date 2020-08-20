import React from "react";
import { useParams } from "react-router-dom";
import makeButton from "./utils/makeButton.js";
import { useAxios } from "./utils/useAxios.js";
import isEmpty from "./utils/isEmptyObject.js";

export default function(props) {

	const params = useParams();
	// if there are no params
	// then use path /
	const req = isEmpty(params) 
		? "/" 
		// if there's a /:language
		// then use it
		: params.language
			? `/${params.language}`
			: "/error";

	if (
		props.type 
		&& props.mapping
	) {
		
		const [{data, loading, error}] = useAxios(req);

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
