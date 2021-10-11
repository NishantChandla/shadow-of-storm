import { useState } from "react";

import MatchMaking from "../sections/MatchMaking";

const Home = () => {
    const [matchMaking, setMatchMaking] = useState(false);
    return (
        <div>
            <button onClick={()=>{setMatchMaking(!matchMaking)}}>Battle</button>
            <MatchMaking matchMaking={matchMaking} setMatchMaking={setMatchMaking}/>
        </div>
    )
}

export default Home;