import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import vampirePurlple from "../../assets/vampire-purple.png";
import wizard from "../../assets/wizard.png";
import "../../css/battle-strategy.css";

const BattleStrategy = () => {
	const socket = useSelector((state) => state.gameSocket);
	const [deck, setDeck] = useState(
		Array(81)
			.fill()
			.map((e) =>
                {
					return { here: false, properties: {} };
                }
			)
	);
	const history = useHistory();

	let boardTiles = Array(81)
		.fill()
		.map((e,idx) => <div key={idx} number={idx}></div>);

	let selected = [
		{
			image: vampirePurlple,
		},
		{
			image: vampirePurlple,
		},
		{
			image: vampirePurlple,
		},
		{
			image: vampirePurlple,
		},
	];

	const setupBeforeUnloadListener = () => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			return (ev.returnValue =
				"Match progress will be lost. Are you sure you want to close?");
		});
	};

	useEffect(() => {
		const tiles = document.getElementsByClassName(
			"battle-strategy-flex-container"
		)[0].children;
		const cards =
			document.getElementsByClassName("build-deck-grid")[0].children;

		let draggedCard;
		let fromCards = false;
        let board = Array(81)
			.fill()
			.map((e) =>
                {
					return { here: false, properties: {} };
                }
		)
		let tile;
		for (let i = 0; i < tiles.length; i++) {
			tiles[i].addEventListener("dragstart", (e) => {
				fromCards = false;
				tile = tiles[i];
                if(tiles[i].getAttribute("number")){
                    board[tiles[i].getAttribute("number")].here = false;
                    setDeck(board);
                }
			});
			tiles[i].addEventListener("dragover", (e) => {
				e.preventDefault();
			});
			tiles[i].addEventListener("dragenter", (e) => {
				e.preventDefault();
			});
			tiles[i].addEventListener("drop", (e) => {
				if (e.target.getAttribute("number") &&!board[e.target.getAttribute("number")].here) {
					if (!fromCards && tile.firstChild) {
						tile.firstChild.remove();
					}
                    if(draggedCard){
					    tiles[i].innerHTML = `<img src="${draggedCard.id}"/>`;
					    draggedCard.remove();
                    }
                    
                    board[e.target.getAttribute("number")].here = true;
                    setDeck(board);
				}
			});
		}
		console.log(cards);
		for (let i = 0; i < cards.length; i++) {
			cards[i].addEventListener("dragstart", (e) => {
				fromCards = true;
				// console.log(e);
				draggedCard = e.path[1];
				// console.log(draggedCard);
				// console.log(this);
			});
		}
		console.log(socket);
		if (Object.keys(socket).length === 0) {
			// history.push("/");
		}
		setupBeforeUnloadListener();
	}, [socket, setDeck]);

	const onReady = () => {
		// go to making deck arragement
		socket.emit("ready-battle", deck);
		history.push("/game");
	};
    console.log(deck);
	return (
		<div className="battle-strategy-container">
			<div>
				<p>Battle Strategy</p>
				<div className="battle-strategy-flex-container">{boardTiles}</div>
			</div>
			<div className="build-deck-selected">
				<button onClick={onReady}>Ready</button>
				<div className="build-deck-recently-listed">Your Deck</div>
				<div className="build-deck-grid">
					{selected.map((e, idx) => (
						<div
							key={idx}
							className="card card-wide card-tall"
							id={wizard}
						>
							<img src={e.image} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BattleStrategy;
