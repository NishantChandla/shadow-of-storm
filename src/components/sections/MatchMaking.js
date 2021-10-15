import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { io, Socket } from "socket.io-client";
//model -> shows anywhere
import "../../css/match-making.css";
import { useDispatch, useSelector } from "react-redux";
import { useWallet } from "@solana/wallet-adapter-react";

const MatchMaking = ({ setMatchMaking }) => {
	const selector = useSelector((state) => state.gameSocket);
	const cards = useSelector((state) => state.userCards);
	const history = useHistory();
	const dispatch = useDispatch();
    const wallet = useWallet();
	const [foundMatch, setfoundMatch] = useState(false);
    const [enemy, setEnemy] = useState({});
    const [ended, setEnded] = useState(false);

	const setupBeforeUnloadListener = () => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
			selector.emit("match-making-cancel");
			return (ev.returnValue =
				"Match progress will be lost. Are you sure you want to close?");
		});
	};

	useEffect(() => {
		selector.emit("find-match", { 
            name: wallet.publicKey.toString(), 
            // cards: cards.length,
            xp: "new",
        });
		selector.on("match-connected", (opponent) => {
            setEnemy(opponent);
            setfoundMatch(true);
            console.log(opponent)
        });
		selector.on("build-decks", (message) => {
			console.log(message);
			//push somewhere
			history.push("/build_deck");
			// then build deck and ready-battle
		});
		selector.on("surrendered", (message) => {
			console.log(message);
		});
		selector.on("battle-ended", () => {
			const newSocket = io(`ws://localhost:3001`);
            setEnded(true);
			dispatch({ type: "SET_SOCKET", payload: newSocket });
		});
		setupBeforeUnloadListener();
	}, [dispatch, ended]);

	const onClose = () => {
		selector.emit("match-making-cancel");
		setMatchMaking(false);
	};

	return (
		<div className="modal-container">
			<div id="myModal" className="modal">
				<div className="modal-content">
					<div className="battle-making-box">
						{(foundMatch && Object.keys(enemy).length !== 0 && !ended) ? (
							<div>
								<div className="find-matchmaking-heading">
									Match found
                                    <span style={{cursor:"pointer"}} onClick={onClose}> X</span>
								</div>
								<div className="modal-details-view-row">
									<p className="modal-details-view-attribute">
										Name
									</p>
									<p className="modal-details-view-value">
										{enemy.name?.slice(0,5)+"..."}
									</p>
								</div>
								{/* <div className="modal-details-view-row">
									<p className="modal-details-view-attribute">
										Card Collection
									</p>
									<p className="modal-details-view-value">
										{enemy.card}
									</p>
								</div> */}
								<div className="modal-details-view-row">
									<p className="modal-details-view-attribute">
										Experience
									</p>
									<p className="modal-details-view-value">
										{enemy.xp}
									</p>
								</div>

								<div className="modal-details-view-row">
									<button className="modal-battle-button" onClick={()=>selector.emit("accept-battle")}>
										Battle
									</button>
									<button className="modal-surrender-button" onClick={()=>selector.emit("reject-battle")}>
										Surrender
									</button>
								</div>
							</div>
						) : (
							<div className="finding-match">
								<div className="find-matchmaking-heading">
									Finding Match
                                    <span style={{cursor:"pointer"}} onClick={onClose}> X</span>
								</div>
								<div className="find-matchmaking-subheading">
									Shadow of Storm bites<br/> Some abilities have a wider
									range of attack, which can help discover
									enemies easier.
								</div>
								<div className="find-matchmaking-desription">
									Searching...
								</div>
							</div>
						)}
					</div>

					{/* <p>Some text in the Modal..</p>
                loading...

            <button onClick={()=>selector.emit("accept-battle")}>
                accept
            </button>

            <button onClick={()=>selector.emit("reject-battle")}>
                reject
            </button> */}
				</div>
			</div>
		</div>
	);
};

export default MatchMaking;
