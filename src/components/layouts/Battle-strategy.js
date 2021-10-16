import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

import CardView from '../ui/CardView';
import wizard from "../../assets/wizard.png";
import "../../css/battle-strategy.css";

const BattleStrategy = () => {
	const socket = useSelector((state) => state.gameSocket);
	const allCards = useSelector((state) => state.selectedCards);
	const dispatch = useDispatch();

	const [deck, setDeck] = useState(
		Array(81)
			.fill()
			.map((e) =>
                {
					return { here: false, properties: "" };
                }
			)
	);

	useEffect(()=>{
		setDeck(Array(81)
		.fill()
		.map((e) =>
			{
				return { here: false, properties: "" };
			}
		));
	},[]);


	const history = useHistory();

	let boardTiles = Array(81)
		.fill()
		.map((e,idx) => <div key={idx} number={idx}></div>);

	const setupBeforeUnloadListener = () => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			return (ev.returnValue =
				"Match progress will be lost. Are you sure you want to close?");
		});
	};

	useEffect(() => {
		if (Object.keys(socket).length === 0) {
			history.push("/");
		}
		setupBeforeUnloadListener();
		
		const tiles = document.getElementsByClassName(
			"battle-strategy-flex-container"
		)[0].children;
		const cards = document.getElementsByClassName("build-deck-grid")[0].children;
		console.log(cards);
		let draggedCard;
		let props;
		let draggedPath;
		let fromCards = false;
        let board = Array(81)
			.fill()
			.map((e) =>
                {
					return { here: false, properties: "" };
                }
		)
		let tile;
		for (let i = 0; i < tiles.length; i++) {
			console.log("setting-listeners");

			tiles[i].addEventListener("dragstart", (e) => {
				fromCards = false;
				tile = tiles[i];
				console.log(e);
				console.log(tiles[i].firstChild);
				draggedCard = tiles[i].firstChild.getAttribute("src");
				props = tiles[i].firstChild.getAttribute("id");
				console.log(draggedCard);
                if(tiles[i].getAttribute("number")){
                    board[tiles[i].getAttribute("number")].here = false;
                    board[tiles[i].getAttribute("number")].properties = "";
					
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
					if (tile && !fromCards && tile.firstChild) {
						tile.firstChild.remove();
					}

                    if(draggedCard){
					    tiles[i].innerHTML = `<img id=${props} src="${draggedCard}"/>`;
						if(draggedPath){
					    	draggedPath.remove();
						}
                    }
                    
                    board[e.target.getAttribute("number")].here = true;
					board[e.target.getAttribute("number")].properties = props;
                    setDeck(board);
				}
			});
		}
		// console.log(cards);
		for (let i = 0; i < cards.length; i++) {
			console.log("setting-listeners");
			cards[i].addEventListener("dragstart", (e) => {
				fromCards = true;
				console.log(e);
				draggedPath = e.path[2];
				draggedCard = e.path[1].getAttribute("image_uri");
				props = e.path[1].getAttribute("id");
				console.log(draggedCard);
				console.log("gg");
			});
		}

	}, [socket, setDeck]);

	const onReady = () => {
		// go to making deck arragement
		let deckToSend = deck;

		deckToSend = deckToSend.map((e)=>{
			if(e.properties===""){
				return e;
			}

			return {here: e.here, properties:allCards.filter((obj)=>obj.mint_id===e.properties)[0]};
		});
		dispatch({type:"SET_STRATEGY", payload: deckToSend})
		dispatch({type:"SET_MY_TILES", payload: deck.map((obj)=>0)})
		dispatch({type:"SET_ENEMY_TILES", payload: deck.map((obj)=>0)})

		socket.emit("ready-battle", deckToSend);
		socket.on("battle-started",(m)=>{
			history.push("/game", {turn:m.turn?1:0,player:m.name});
		})
	};

	return (
		<div>
			<div style={{display:'flex', flexDirection:'row'}}>
			<div>
				<p className="battle-strategy-title">Battle Strategy</p>
				<p className="battle-strategy-sub-title">In the midst of chaos, there is also opportunity. ~ Sun Tzu</p>
			</div>

			<button className="battles-strategy-button" onClick={onReady}>Ready</button>
			</div>


		<div className="battle-strategy-container">
			<div>
				<div className="battle-strategy-flex-container">{boardTiles}</div>
			</div>
			<div className="battle-strategy-deck-selected">
				<div className="build-deck-recently-listed">Available Cards</div>
				<div className="build-deck-grid">
					{allCards.map((e, idx) => (
						<div
							key={idx}
							className="card card-wide card-tall"
							id={wizard}
						>
							<CardView
								id={e.mint_id}
								onClick={() => {
								}}
								image={e.image_uri}
								name={e.name}
								level={e.level}
								health={e.health}
								attackpoint={e.attackpoints}
								mana={e.mana}
							></CardView>
						</div>
					))}
				</div>
			</div>
		</div>
		</div>

	);
};

export default BattleStrategy;
