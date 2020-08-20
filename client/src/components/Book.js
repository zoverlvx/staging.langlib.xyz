import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import FlipPage from "react-flip-page";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Modal from "@material-ui/core/Modal";
import { useAxios } from "./utils/useAxios.js"

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

export default function(props) {
	
	const location = useLocation();
	
	// gets the value of the query
	const pageNumber = (
		new URLSearchParams(location.search).get("page") - 1
	);

	// gets the params
	const params = useParams();

	// makes request for book in specific language
	const [{loading, data, error}] = 
		useAxios(`/${params.language}/${params.book}`);

	// the entire book object
	const [book, setBook] = useState(null);
	// the specific classifier by which the words will be viewed
	const [pages, setFilter] = useState([]);	
	
	useEffect(() => {
		if (data) {
			setBook(data.book);
			// default classifier for words on the page
			// clicking on each word will simply define them
			// as if having a dictionary immediately available
			setFilter(data.book["definitions"]);
		}	
	}, [data])
	
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

	// set the word for the modal
	// open the modal
	function handleOpen(page) {
		setActiveWord(page);
		setOpen(state => !state);
	}

	// close the modal
	function handleClose() {
		setOpen(state => !state);
	}
	
    // handle opening the modal
	function handleClick(e, page) {
		e.preventDefault();
		handleOpen(page);
	}

    // handle changing the type of dictionary information for the words
	function handleButtonClick(e, filter) {
		e.preventDefault();
		setFilter(book[filter])
	}

	// handle hovering over the word
	function handleHover(e, key) {
		e.preventDefault();
		setHovered(key);
	}

	// sets up the text on the page
	function createText(page) {
		return page.text.map(function(item, i) {
			
			// definitions -> item.word
			// grammar -> item.word
			// translation -> item.sentence
			const word = item.word 
				? item.word 
				: item.sentence
				? item.sentence 
				: "";
			
			// creates key identifier
			const key = `${i}-${word}`;

			const l = word.length - 1;
			const lastLetter = word[l];

			const condition = (
				// if word property exists
				item.word && (
					// and if the last letter of the word is 
					// a period or comma
					lastLetter === "."
					|| lastLetter === ","
				) 
				// then remove the period or comma
				? word.replace(/[.,]/g, "") 
				// otherwise if there's a sentence property
				: item.sentence 
				// then return an empty string
				? "" 
				// otherwise return the afore-defined word
				: word
			);			
			
			// defines content for use in modal
			const wordForModal = {
				...item,
				word: condition
			};
			
			return (
				<span 
					style={{
						backgroundColor: 
							hoveredWord === key 
								? "yellow" 
								: ""
					}}
					onMouseOver={(e) => handleHover(e, key)}
					key={key}
					className="word"
					onClick={(e) => handleClick(e, wordForModal)}
				>
					{`${word} `}
				</span>
			);
		});
	}

	function createPages(page, i) {
		return <div 
			key={`${page.number}`}
		>
			{createText(page)}
		</div>;
	}

	if (loading) return <div>LOADING...</div>;
	if (!pages.length) return <div>LOADING...</div>;
	if (error) return <div>Error</div>;
	if (pages.length) {
		const style = {
			marginTop: "50px",
			display: "flex",
			justifyContent: "center"
		};
		return (
			<div>
				<div style={style}>
					<FlipPage
						uncutPages={true}
						pageBackground="#e6d1a0"
						startAt={pageNumber ? pageNumber : 0}
						orientation="horizontal"
						height={500}
						width={407}
						swipeImmune={[".word"]}
					>
						{pages.map(createPages)}
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
							onClick={e => handleButtonClick(e, "definitions")}
						>
							Definitions
						</Button>
						<Button
							onClick={e => handleButtonClick(e, "grammar")}
						>
							Grammar	
						</Button>
						<Button
							onClick={e => handleButtonClick(e, "translation")}
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
						{
							activeWord.partOfSpeech
								? <> 
							<p>English: {activeWord.translation}</p>
							<p>Part Of Speech: {activeWord.partOfSpeech}</p>
								</> :
							activeWord.term && activeWord.context ?
								<>
									<p>English: {activeWord.translation}</p>
									<p>Grammatical term: {activeWord.term}</p>
									<p>Context: {activeWord.context}</p>
								</> :
							activeWord.term ?
								<>
									<p>English: {activeWord.translation}</p>
									<p>Grammatical term: {activeWord.term}</p>
								</> : 
							activeWord.sentence ? 
								<>
									<p>{activeWord.translation}</p>
								</>
							: <p>Zilch</p>
						}
					</div>
				</Modal>
			</div>
		);
	}
} 
