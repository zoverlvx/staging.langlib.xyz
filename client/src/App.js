import React, { useState } from "react";
import FlipPage from "react-flip-page";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import data from "./data/pages.js";

function rand() {
	return Math.round(Math.random() * 20) -10;
}

function getModalStyle() {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles(theme => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center"
	},
	paper: {
		position: "absolute",
		width: 450,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	}
}));

export default function() {

	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const [activeWord, setActiveWord] = useState({word: "default"});
	const [hoveredWord, setHovered] = useState(null);

	function handleOpen(page) {
		setActiveWord(page);
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	const defaultPages = data;

	

	function handleClick(e, page) {
		e.preventDefault();
		handleOpen(page);
	}

	function handleHover(e, key) {
		e.preventDefault();
		setHovered(key);
	}

	function createText(page) {
		return page.text.map(function(item, i) {
			// creates key identifier
			const key = `${i}-${item.word}`;

			
			const l = item.word.length - 1;
			const lastLetter = item.word[l];
			
			// if the word ends in punctuation
			// removes punctuation 
			// before the word is shown in the modal
			const wordForModal = {
				...item,
				word: 
					lastLetter === "."
					|| lastLetter === ","
						? item.word.replace(/[.,]/g, "")
						: item.word 
			};

			return (
				<span 
					style={{
						backgroundColor: 
							hoveredWord === key 
								? "yellow" 
								: "white"
					}}
					onMouseOver={(e) => handleHover(e, key)}
					key={key}
					className="word"
					onClick={(e) => handleClick(e, wordForModal)}
				>
					{`${item.word} `}
				</span>
			);
		});
	}

	function createPages(page, i) {
		return <div key={`${page.number}`}>{createText(page)}</div>;
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
				swipeImmune={[".word"]}
			>
				{pages}
			</FlipPage>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<div
					style={modalStyle}
					className={classes.paper}
				>
					<h2>
						{
							activeWord.original
								? activeWord.original
								: activeWord.word
						}
					</h2>
					<p>Description</p>
				</div>
			</Modal>
		</div>
	);
}
