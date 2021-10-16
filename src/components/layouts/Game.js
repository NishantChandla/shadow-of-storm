import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TurnImage from '../../assets/turn.png';
import TileCracked from '../../assets/tile_cracked.png';

import TombStone from '../../assets/tombstone.png';
import "../../css/game.css";
import { Link } from "react-router-dom";

const Game = () => {
	const socket = useSelector((state) => state.gameSocket);
	const deck = useSelector((state) => state.strategy);
	const mytiles = useSelector(state=>state.myTiles);
	const enemytiles = useSelector(state=>state.enemyTiles);
	const dispatch = useDispatch();
	const [cardSelected, setCardSelected] = useState();
	const [turn, setTurn] = useState(true);
	const wallet = useWallet();
	const [ player, setPlayer] = useState({name:"Player"});
	const history = useHistory();
	const [winner, setWinner] = useState();


	useEffect(() => {
		setTurn(history.location.state.turn===1);
		setPlayer(history.location.state.player);
		if (Object.keys(socket).length === 0) {
			history.push("/");
		}

		socket.on("turn", (m) => {
			setTurn(m);
		});
		socket.on("hit", (m) => {
			dispatch({type:"SET_ONE_ENEMY_TILE", payload:{type:1, id: m.idx}})
		});
		socket.on("enemy-hit", (m) => {
			dispatch({type:"SET_ONE_TILE", payload:{type:1, id: m.idx}})
		});
		socket.on("miss", (m) => {
			dispatch({type:"SET_ONE_ENEMY_TILE", payload:{type:2, id: m.idx}})
		});
		socket.on("enemy-miss", (m) => {
			dispatch({type:"SET_ONE_TILE", payload:{type:2, id: m.idx}})
		});
		socket.on("winner",(m)=>{
			setWinner(m);
		})
		setupBeforeUnloadListener();
	}, [socket]);

	let boardTiles = deck.map((e, idx) => {
		if(mytiles[idx]===0){
			if (e.properties === "") {
				return <div className="plain" key={idx} number={idx}></div>;
			} else {
				return (
					<div className="plain" key={idx} number={idx}>
						<img
							onClick={() => turn && setCardSelected(idx)}
							className={`${
								cardSelected !== undefined &&
								cardSelected === idx &&
								turn
									? "card-selected"
									: ""
							}`}
							id={e.properties.mint_id}
							src={e.properties.image_uri}
						/>
					</div>
				);
			}
		}else if(mytiles[idx]===1){
			return (
				<div
					className={`plain`}
					key={idx}
					number={idx}
				>
					<img
					src={TombStone}
				/>
				</div>
			);
		}else if(mytiles[idx]===2){
			if (e.properties === "") {
				return <div className="miss" key={idx} number={idx}></div>;
			} else {
				return (
					<div className="miss" key={idx} number={idx}>
						<img
							onClick={() => turn && setCardSelected(idx)}
							className={`${
								cardSelected !== undefined &&
								cardSelected === idx &&
								turn
									? "card-selected"
									: ""
							}`}
							id={e.properties.mint_id}
							src={e.properties.image_uri}
						/>
					</div>
				);
			}
		}
		console.log(mytiles);
	});

	let enemyTiles = enemytiles
		.map((e, idx) => {
			if(e===0){
				return (
					<div
						className="plain"
						key={idx}
						number={idx}
						onClick={() => {
							if (cardSelected !== undefined) {
								socket.emit("attack", {
									cardSelected,
									idx,
									props: deck[cardSelected].properties,
								});
								setCardSelected(undefined);
							}
						}}
					></div>
				);
			}
			if(e===1){
				return (
					<div
						className={`plain`}
						key={idx}
						number={idx}
						onClick={() => {
							if (cardSelected !== undefined) {
								socket.emit("attack", {
									cardSelected,
									idx,
									props: deck[cardSelected].properties,
								});
								setCardSelected(undefined);
							}
						}}
					>
						<img
						src={TombStone}
					/>
					</div>
				);
			}
			if(e===2){
				return (
					<div
						className={`miss`}
						key={idx}
						number={idx}
						onClick={() => {
							if (cardSelected !== undefined) {
								socket.emit("attack", {
									cardSelected,
									idx,
									props: deck[cardSelected].properties,
								});
								setCardSelected(undefined);
							}
						}}
					>
					</div>
				);
			}
		});

	const setupBeforeUnloadListener = () => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			return (ev.returnValue =
				"Match progress will be lost. Are you sure you want to close?");
		});
	};

	return (
		<div className="game-container">
			<p className="game-title">Battle</p>
			{winner!==undefined?
				<div>
					<div className="modal-container">
			<div id="myModal" className="modal">
				<div className="modal-content">
					<div className="battle-making-box">
							<div className="finding-match">
								<div className="find-matchmaking-heading" style={{marginLeft:"150px"}}>
									{winner?"You Won":"You Lost"}
                                    {/* <span style={{cursor:"pointer"}} onClick={onClose}> X</span> */}
								</div>
								<div className="find-matchmaking-subheading">
									Shadow of Storm bites<br/> Some abilities have a wider
									range of attack, which can help discover
									enemies easier.
								</div>
								<Link to="/battle" style={{textDecoration:'none'}}>
									<button className="battles-strategy-button" >
										Close
									</button>
								</Link>
								{/* <div className="find-matchmaking-desription">
									Searching...
								</div> */}
							</div>
					</div>

				</div>
			</div>
		</div>
				</div>
			:<div className="game-arena">
				<div className="game-sub-title">
					{wallet.connected?wallet?.publicKey?.toString():'Player'}
					<div className="game-flex-container">{boardTiles}</div>
				</div>
				<img className={`turn-indicator ${turn?'my-turn':'away-turn'}`} src={TurnImage}/>
				<div className="game-sub-title">
					{player.name}
					<div className="game-flex-container">{enemyTiles}</div>
				</div>
			</div>
			}
		</div>
	);
};

export default Game;
