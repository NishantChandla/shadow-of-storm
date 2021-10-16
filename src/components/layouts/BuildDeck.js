import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useWallet } from "@solana/wallet-adapter-react";

import { fetchUserCards } from "../../actions";
import "../../css/build-deck.css";
import CardView from "../ui/CardView";

const BuildDeck = () => {
	const socket = useSelector((state) => state.gameSocket);
	const history = useHistory();

	const cards = useSelector((state) => state.allCards);
	const [myCards, setMyCards] = useState([]);
	const dispatch = useDispatch();
	const wallet = useWallet();
	const [mana, setMana] = useState(0);
	const [selected, setSelected] = useState([]);
	const [selectedCards, setSelectedCards] = useState([]);

	useEffect(() => {
		if (wallet.publicKey !== null) {
			dispatch(fetchUserCards({ address: wallet.publicKey.toString() }));
		}
	}, [dispatch, wallet]);

	useEffect(() => {
		const c = cards.filter((obj) => !selected.includes(obj.mint_id));
		setMyCards(c);
		let m = 0;
		setSelectedCards(cards.filter((obj) => {
			if (selected.includes(obj.mint_id)) {
				m += obj.mana;
				return true;
			}
		}));
		setMana(m);
		console.log("yes");
	}, [cards, selected]);

	const setupBeforeUnloadListener = () => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			return (ev.returnValue =
				"Match progress will be lost. Are you sure you want to close?");
		});
	};

	useEffect(() => {
		console.log(socket);
		if (Object.keys(socket).length === 0) {
			history.push("/");
		}
		setupBeforeUnloadListener();
	}, [socket]);

	const onReady = () => {
		dispatch({ type: "SET_SELECTED_CARDS", payload: selectedCards });
		// go to making deck arragement
		history.push("/battle_strategy");
	};

	return (
		<div className="build-deck-flex-container">
			<div className="build-deck-selected">
				<div className="mana-container">
					<p className="mana-heading">MANA</p>
					<p className="mana-heading">{mana}/15</p>
					<button
						className="build-deck-strategy-button"
						onClick={onReady}
					>
						Ready
					</button>
					{selectedCards.map((obj) => (
						<div className="build-deck-mana-view1">
							<br />

							<div>
								<div className="build-deck-mana-name">
									{obj.name}
									<span style={{ cursor: "pointer", color: "red" }} onClick={() => { if (mana < 25) { setSelected(selected.filter((e) => e !== obj.mint_id)) } }}>
										{" "}
										X
									</span>
								</div>
								<div className="build-deck-mana-value">
									Mana: {obj.mana}
								</div>
							</div>
						</div>
					))}
					{/* <div className="build-deck-mana-view2">
					<br/>
					<div className="build-deck-mana-name">Name</div>
					<div className="build-deck-mana-value" >Mana</div>
				</div>

				<div className="build-deck-mana-view3">
					<br/>
					<div className="build-deck-mana-name">Name</div>
					<div className="build-deck-mana-value" >Mana</div>
				</div>
			 */}
				</div>
			</div>

			<div className="build-deck-card-container">
				<div className="build-deck-recently-listed">Your Cards</div>
				<div className="build-deck-grid">
					{myCards.map((e, idx) => (
						<div key={idx} className="card card-wide card-tall">
							{/* <img src={e.image_uri} /> */}
							<CardView
								onClick={() => {
									console.log("c");
									if (mana <= 15 && mana + e.mana <= 15) {
										setSelected([...selected, e.mint_id]);
									}
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
	);
};

export default BuildDeck;
