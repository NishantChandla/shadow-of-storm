import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

import vampirePurlple from "../../assets/vampire-purple.png";
import "../../css/build-deck.css";

const BuildDeck = () => {
	const socket = useSelector((state) => state.gameSocket);
	const history = useHistory();

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
    ]

	let cards = [
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
            return ev.returnValue = 'Match progress will be lost. Are you sure you want to close?';
        });
    };

	useEffect(() => {
		console.log(socket);
		if (Object.keys(socket).length === 0) {
			// history.push("/");
		}
        setupBeforeUnloadListener();
	}, [socket]);

    const onReady = () => {
        // go to making deck arragement
        history.push('/battle_strategy');
    }

	return (
		<div className="build-deck-flex-container">
			<div className="build-deck-selected">
                <button onClick={onReady}>Ready</button>
                <p>MANA 2/6</p>
				<div className="build-deck-recently-listed">Your Deck</div>
				<div className="build-deck-grid">
					{selected.map((e) => (
						<div className="card card-wide card-tall">
							<img src={e.image} />
						</div>
					))}
				</div>
			</div>

			<div className="build-deck-card-container">
				<div className="build-deck-recently-listed">Your Cards</div>
				<div className="build-deck-grid">
					{cards.map((e) => (
						<div className="card card-wide card-tall">
							<img src={e.image} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default BuildDeck;
