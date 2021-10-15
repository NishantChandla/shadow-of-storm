import { useEffect,useState } from "react";
import { useHistory } from "react-router";
import { io } from "socket.io-client";
//model -> shows anywhere
import "../../css/match-making.css";
import { useDispatch, useSelector } from "react-redux";

const MatchMaking = ({setMatchMaking}) => {
    const selector = useSelector(state=>state.gameSocket);
    const history = useHistory();
    const dispatch = useDispatch();
    const [foundMatch, setfoundMatch] = useState(true);

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
            <div className='battle-making-box'>
            {foundMatch?
            <div>
              <div className="find-matchmaking-heading" >Match found</div>
              <div className="modal-details-view-row">
              <p className="modal-details-view-attribute">Rarity</p>
              <p className="modal-details-view-value">Gold</p>
          </div>
          <div className="modal-details-view-row">
              <p className="modal-details-view-attribute">Rarity</p>
              <p className="modal-details-view-value">Gold</p>
          </div>
          <div className="modal-details-view-row">
              <p className="modal-details-view-attribute">Rarity</p>
              <p className="modal-details-view-value">Gold</p>
          </div>

          <div className="modal-details-view-row">
              <button className="modal-battle-button" >Battle</button>
              <button className="modal-surrender-button">Surrender</button>
          </div>
          </div>
            
            :
            <div className="finding-match">
                <div className="find-matchmaking-heading">Finding Match</div>
                <div  className="find-matchmaking-subheading" >SPLINTER BITES Some abilities have a wider range of attack, which can help discover enemies easier.</div>
                <div  className="find-matchmaking-desription">Searching...</div>


            </div>
            
            
            
            }
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
        </div>;
};

export default MatchMaking;
