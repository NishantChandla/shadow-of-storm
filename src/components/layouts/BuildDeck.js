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
				<div className="mana-container">
                <p className="mana-heading">MANA</p>
				<p className="mana-heading">2/6</p>
                <button className="build-deck-strategy-button" onClick={onReady}>Ready</button>

				<div className="build-deck-mana-view1">
					<br/>
					<div className="build-deck-mana-name">Name</div>
					<div className="build-deck-mana-value" >Mana</div>
				</div>

				<div className="build-deck-mana-view2">
					<br/>
					<div className="build-deck-mana-name">Name</div>
					<div className="build-deck-mana-value" >Mana</div>
				</div>

				<div className="build-deck-mana-view3">
					<br/>
					<div className="build-deck-mana-name">Name</div>
					<div className="build-deck-mana-value" >Mana</div>
				</div>
			
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
