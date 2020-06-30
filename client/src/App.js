import React, { useState } from "react";
import FlipPage from "react-flip-page";

export default function() {

	const defaultPages = [
		{
			text: "In St. Jago, der Hauptstadt des Königreichs Chili, stand gerade in dem Augenblicke der grossen Erderschütterung vom Jahre 1647, bei welcher viele tausend Menschen ihren Untergang fanden, ein junger, auf ein Verbrechen angeklagter Spanier namens Jeronimo Rugera an einem Pfeiler des Gefängnisses, in welches man ihn eingesperrt hatte, und wollte sich erhenken. Don Henrico Asteron, einer der reichsten Edelleute der Stadt, hatte ihn ohngefähr ein Jahr zuvor aus seinem Hause, wo er als Lehrer angestellt war, entfernt, weil er sich mit Donna Josephe, seiner einzigen Tochter, in einem zärtlichen Einverständnis befunden hatte."
		},
		{text: "page two"},
		{text: "page three"},
		{text: "page four"},
		{text: "page five"},
		{text: "page six"},
		{text: "page seven"},
		{text: "page eight"},
		{text: "page nine"},
		{text: "page ten"}
	];

	function createPages(page, i) {
		return <div key={`${page.text}-${i}`}>{page.text}</div>;
	}

	const pages = defaultPages.map(createPages);

	return (
		<div style={{
			marginTop: "50px",
			display: "flex", 
			justifyContent: "center"
		}}>
			<FlipPage
				orientation="horizontal"
				height={500}
			>
				{pages}
			</FlipPage>
		</div>
	);
}

export default App;
