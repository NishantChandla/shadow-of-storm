import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";

const BuildDeck = () => {
    const socket = useSelector(state=>state.gameSocket);
    const history = useHistory();

    useEffect(()=>{
        console.log(socket);
        if(Object.keys(socket).length === 0){
            history.push("/");
        }
    },[socket])

    return (
        <div>
            <div>

            </div>
            <div>
                
            </div>
        </div>
    )
}

export default BuildDeck;