import { useEffect } from "react";
import { useHistory } from "react-router";
import { io } from "socket.io-client";
//model -> shows anywhere
import "../../css/match-making.css";
import { useDispatch, useSelector } from "react-redux";

const MatchMaking = ({setMatchMaking}) => {
    const selector = useSelector(state=>state.gameSocket);
    const history = useHistory();
    const dispatch = useDispatch();

    const setupBeforeUnloadListener = () => {
		window.addEventListener("beforeunload", (ev) => {
			ev.preventDefault();
            selector.emit("match-making-cancel");
			return (ev.returnValue =
				"Match progress will be lost. Are you sure you want to close?");
		});
	};

	useEffect(() => {
        selector.emit("find-match", {"name":"nishant", "battle-won": 10})
		selector.on("match-connected", (opponent) => console.log(opponent));
		selector.on("build-decks", (message) =>{ 
            console.log(message);
            //push somewhere
            history.push('/build_deck');
            // then build deck and ready-battle
        });
        selector.on("surrendered", message=>{
            console.log(message)

        });
        selector.on("battle-ended", ()=>{
            const newSocket = io(`ws://localhost:3001`);
        
            dispatch({type:"SET_SOCKET", payload:newSocket})
        });
		setupBeforeUnloadListener();

	}, [dispatch]);

    const onClose = () => {
        selector.emit("match-making-cancel");
        setMatchMaking(false);
    }

	return <div className="modal-container">
        <div id="myModal" className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <p>Some text in the Modal..</p>
                loading...

            <button onClick={()=>selector.emit("accept-battle")}>
                accept
            </button>

            <button onClick={()=>selector.emit("reject-battle")}>
                reject
            </button>

        </div>
        </div>
        </div>;
};

export default MatchMaking;
