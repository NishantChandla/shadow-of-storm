import { useState } from "react";

import MatchMaking from "../sections/MatchMaking";
const Battle = () => {
    const [matchMaking, setMatchMaking] = useState(false);

    return (
        <div>
            <button onClick={()=>{setMatchMaking(!matchMaking)}}>Battle</button>
            {matchMaking?
                <MatchMaking setMatchMaking={setMatchMaking}/>
                :null
            }
        </div>
    )
}

export default Battle;