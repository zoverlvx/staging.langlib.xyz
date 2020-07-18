import React, { useState } from "react";
import FlipPage from "react-flip-page";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

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
	},
	word: {
		"&:hover": {
			backgroundColor: "yellow"
		}
	}
}));

export default function() {

	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);
	const [activeWord, setActiveWord] = useState({word: "default"});

	function handleOpen(page) {
		setActiveWord(page);
		setOpen(true);
	}

	function handleClose() {
		setOpen(false);
	}

	const defaultPages = [
		{	number: "1",
			text: [ 
				{
					word: "In", 
					translation: "in"
				},
				{
					word: "St. Jago", 
					translation: "Santiago"
				},
				{
					word: "der", 
					translation: "the"
				},
				{
					word: "Hauptstadt", 
					original: "die Hauptstadt",
					translation: "capital"
				},
				{
					word: "des",
					translation: "of the"
				},
				{
					word: "Königreichs", 
					original: "das Königreich",
					translation: "kingdom"
				},
				{
					word: "Chili", 
					translation: "Chile"
				},
				{
					word: ",",
					translation: "In Santiago, the capital of the kingdom of Chile,"
				},
				{
					word: "stand", 
					original: "stehen"
				},
				{
					word: "gerade", 
					pos: "adverb",
					translation: "was standing"
				},
				{
					word: "in", 
					pos: "preposition"
				},
				{
					word: "dem"
				},
				{
					word: "Augenblicke", 
					original: "der Augenblick"
				},
				{
					word: "der"
				},
				{
					word: "grossen", 
					original: "gross"
				},
				{
					word: "Erderschütterung", 
					original: "die Erderschütterung"
				},
				{
					word: "vom", 
					details: "vom + dem = vom"
				},
				{
					word: "Jahre", 
					original: "Jahr"
				},
				{
					word: "1647,", 
					original: "1647"
				},
				{
					word: "bei", 
					pos: "preposition"
				},
				{
					word: "welcher", 
					original: "welch"
				},
				{
					word: "viele", 
					original: "viel"
				},
				{
					word: "tausend"
				},
				{
					word: "Menschen", 
					original: "der Mensch"
				},
				{
					word: "ihren", 
					original: "ihr"
				},
				{
					word: "Untergang", 
					original: "der Untergang"
				},
				{
					word: "fanden,", 
					original: "finden"
				},
				{
					word: "ein"
				},
				{
					word: "junger,", 
					original: "jung"
				},
				{
					word: "auf"
				},
				{
					word: "ein"
				},
				{
					word: "Verbrechen", 
					original: "das Verbrechen"
				},
				{
					word: "angeklagter", 
					original: "angeklagt"
				},
				{
					word: "Spanier"
				},
				{word: "namens"},
				{word: "Jeronimo Rugera"},
				{word: "an", pos: "preposition"},
				{word: "einem", original: "ein"},
				{word: "Pfeiler", original: "der Pfeiler"},
				{word: "des"},
				{word: "Gefängnisses,", original: "das Gefängnis"},
				{word: "in", pos: "preposition"},
				{word: "welches", original: "welch"},
				{word: "man"},
				{word: "ihn"},
				{word: "eingesperrt", original: "einsperren"},
				{word: "hatte,", original: "haben"},
				{word: "und"},
				{word: "wollte", original: "wollen"},
				{word: "sich"},
				{word: "erhenken.", original: "erhenken"},
				{word: "Don Henrico Asteron,", original: "Don Henrico Asteron"},
				{word: "einer", original: "ein"},
				{word: "der"},
				{word: "reichsten", original: "reich"},
				{word: "Edelleute", original: "die Edelleute"},
				{word: "der"},
				{word: "Stadt,", original: "die Stadt"},
				{word: "hatte", original: "haben"},
				{word: "ihn"},
				{word: "ohngefähr"},
				{word: "ein"},
				{word: "Jahr", original: "das Jahr"},
				{word: "zuvor"},
				{word: "aus", pos: "dative preposition"},
				{word: "Hause,", original: "das Haus"},
				{word: "wo"},
				{word: "er", pos: "third person singular pronoun"},
				{word: "als"},
				{word: "Lehrer", original: "der Lehrer"},
				{word: "angestellt", original: "anstellen"},
				{word: "war,", original: "sein"},
				{word: "entfernt,", original: "entfernen"},
				{word: "weil"},
				{word: "er"},
				{word: "sich"},
				{word: "mit", pos: "dative preposition"},
				{word: "Donna Joesphe,", original: "Donna Josephe"},
				{word: "seiner"},
				{word: "einzigen", original: "einzig"},
				{word: "Tochter,", original: "die Tochter"},
				{word: "in"},
				{word: "einem"},
				{word: "zärtlichen", original: "zärtlich"},
				{word: "Einverständnis", original: "das Einverständnis"},
				{word: "befunden", original: "befinden"},
				{word: "hatte.", original: "haben"}
            ]
		},

		{
			number: "2",
			text: [
				{word: "Die"}, 
				{word: "zweite"}, 
				{word: "Seite.", original: "die Seite"}
			]
		},
		
		{
			number: "3",
			text: [
				{word: "Die"},
				{word: "dritte"},
				{word: "Seite.", original: "die Seite"}
			]
		},
	];

	function handleClick(e, page) {
		e.preventDefault();
		handleOpen(page);
	}

	function createText(page) {
		return page.text.map(function(item, i) {
			return (
					<span 
						key={`${i}-${item.word}`}
						className={classes.word}
						onClick={(e) => handleClick(e, item)}
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
