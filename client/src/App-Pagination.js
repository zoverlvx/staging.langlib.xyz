import React, { useState } from "react";
import Pagination from "@material-ui/lab/Pagination";

export default function() {

	const defaultPages = {
		1: {
			text: "In St. Jago, der Hauptstadt des Königreichs Chili, stand gerade in dem Augenblicke der grossen Erderschütterung vom Jahre 1647, bei welcher viele tausend Menschen ihren Untergang fanden, ein junger, auf ein Verbrechen angeklagter Spanier namens Jeronimo Rugera an einem Pfeiler des Gefängnisses, in welches man ihn eingesperrt hatte, und wollte sich erhenken. Don Henrico Asteron, einer der reichsten Edelleute der Stadt, hatte ihn ohngefähr ein Jahr zuvor aus seinem Hause, wo er als Lehrer angestellt war, entfernt, weil er sich mit Donna Josephe, seiner einzigen Tochter, in einem zärtlichen Einverständnis befunden hatte."		},
		2: {text: "page two"},
		3: {text: "page three"},
		4: {text: "page four"},
		5: {text: "page five"},
		6: {text: "page six"},
		7: {text: "page seven"},
		8: {text: "page eight"},
		9: {text: "page nine"},
		10: {text: "page ten"}
	};

	const totalPages = Object.keys(defaultPages).length;
	const [pages, setPages] = useState(defaultPages);
	const [activePage, setActivePage] = useState(1);

	function handlePageChange(e, pageNumber) {
		setActivePage(pageNumber);
	}

	return (
		<>
			<Pagination 
				count={totalPages}
				color="primary"
				variant="outlined"
				showFirstButton
				showLastButton
				onChange={handlePageChange}
			/>
			{pages[activePage].text}
		</>
	);
}
