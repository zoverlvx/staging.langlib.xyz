import React, { useState } from "react";
import FlipPage from "react-flip-page";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Modal from "@material-ui/core/Modal";
import bookData from "./data/books/dasErdbebenInChili";

// CSS magic 

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

// end of CSS magic

export default function() {
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);

	// open the modal
	const [open, setOpen] = useState(false);
	// set this word on the modal
	const [activeWord, setActiveWord] = useState({word: "default"});
	// highlight the word
	const [hoveredWord, setHovered] = useState(null);
	// sets the dictionary type of what information will be available
	// about the words in the book
	const [dictType, setDictType] = useState(bookData["definitions"]);

	// set the word for the modal
	// open the modal
	function handleOpen(page) {
		setActiveWord(page);
		setOpen(true);
	}

	// close the modal
	function handleClose() {
		setOpen(false);
	}
	
    // handle opening the modal
	function handleClick(e, page) {
		e.preventDefault();
		handleOpen(page);
	}

    // handle changing the type of dictionary information for the words
	function handleDictClick(e, dt) {
		e.preventDefault();
		setDictType(bookData[dt])
	} 

    // handle hovering over the word
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
	
	const pages = dictType.map(createPages);

	return (
		<div>
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
			</div>
			<div style={{
				display: "flex",
				justifyContent: "center"
			}}>
				<ButtonGroup
					size="large"
					variant="outlined"
				>
					<Button
						onClick={e => handleDictClick(e, "definitions")}
					>
						Definitions
					</Button>
					<Button
						onClick={e => handleDictClick(e, "grammar")}
					>
						Grammar	
					</Button>
					<Button
						onClick={e => handleDictClick(e, "translation")}
					>
						Translation
					</Button>
				</ButtonGroup>
			</div>
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
