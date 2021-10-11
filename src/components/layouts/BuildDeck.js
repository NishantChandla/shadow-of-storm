import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const BuildDeck = () => {
    const socket = useSelector(state=>state.socketReducer);
    const history = useHistory();

    useEffect(()=>{
        console.log(socket);
        if(Object.keys(socket).length === 0){
            history.push("/");
        }
        return ()=>{
            if(Object.keys(socket).length !== 0) socket.emit("match-making-cancel");
        }
    },[socket])

    return (
        <div>

        </div>
    )
}

export default BuildDeck;