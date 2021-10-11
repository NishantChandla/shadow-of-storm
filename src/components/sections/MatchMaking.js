import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useHistory } from "react-router";
//model -> shows anywhere
import "../../css/match-making.css";
import { useDispatch } from "react-redux";

const MatchMaking = ({setMatchMaking}) => {
    const history = useHistory();
    const dispatch = useDispatch();
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io(`ws://localhost:3000`);
		setSocket(newSocket);
        dispatch({type:"SET_SOCKET", payload:newSocket})
		newSocket.on("match-connected", (message) => console.log(message));
		newSocket.on("ready-battle", (message) => console.log(message));
		newSocket.on("build-decks", (message) =>{ 
            console.log(message);
            history.push("/build-deck");
        });
	}, [setSocket]);

    const onClose = () => {
        socket.emit("match-making-cancel");
        setMatchMaking(false);
    }

	return <div className="modal-container">
        <div id="myModal" className="modal">
        <div className="modal-content">
            <span className="close" onClick={onClose}>&times;</span>
            <p>Some text in the Modal..</p>
            loading...
            <button onClick={()=>socket.emit("ready-battle")}>
                ready
            </button>
        </div>
        </div>
        </div>;
};

export default MatchMaking;
