import React from "react";
import BookButton from "./BookButton.js";

export default function(props) {
	return props.books.map(function(book, i) {
		return <BookButton book={book} />;
	})
}
