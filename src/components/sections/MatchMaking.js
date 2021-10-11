import { useEffect, useState } from "react";
import { io } from "socket.io-client";
//model -> shows anywhere
import "../../css/match-making.css";

const MatchMaking = ({matchMaking, setMatchMaking}) => {
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		const newSocket = io(`ws://localhost:3000`);
		setSocket(newSocket);

		newSocket.on("match-connected", (message) => console.log(message));
		newSocket.on("ready-battle", (message) => console.log(message));
		newSocket.on("build-decks", (message) => console.log(message));
		return () => newSocket.close();
	}, [setSocket]);

	return <div className="modal-container">loading...
        <button onClick={()=>socket.emit("ready-battle")}>
            ready
        </button>
        <div id="myModal" class="modal" style={{display:`${matchMaking?"block":"none"}`}}>
        <div class="modal-content">
            <span class="close" onClick={()=>setMatchMaking(false)}>&times;</span>
            <p>Some text in the Modal..</p>
        </div>
        </div>
        </div>;
};

export default MatchMaking;
