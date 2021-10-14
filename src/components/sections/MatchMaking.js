import { useEffect } from "react";
import { useHistory } from "react-router";
//model -> shows anywhere
import "../../css/match-making.css";
import { useDispatch, useSelector } from "react-redux";

const MatchMaking = ({setMatchMaking}) => {
    const selector = useSelector(state=>state.gameSocket);
    const history = useHistory();

	useEffect(() => {
        selector.emit("find-match", {"name":"nishant", "battle-won": 10})
		selector.on("match-connected", (opponent) => console.log(opponent));
		selector.on("build-decks", (message) =>{ 
            console.log(message);
            //push somewhere
            history.push('/build-deck');
            // then build deck and ready-battle
        });
        selector.on("surrendered", message=>console.log(message));
	}, [selector]);

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
            <button onClick={()=>selector.emit("ready-battle")}>
                ready
            </button>

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
