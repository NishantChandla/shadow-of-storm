import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

import "../../css/battle.css";
import MatchMaking from "../sections/MatchMaking";

const Battle = () => {
	const [matchMaking, setMatchMaking] = useState(false);
    const wallet = useWallet();

	return (
		<div>
			{matchMaking ? (
				<MatchMaking setMatchMaking={setMatchMaking} />
			) : null}
			<div className="battle-header-view">
				<div className="battle-find-match">
					<br />
					<div className="battle-header-box-title">Find match</div>
					<div className="battle-battle-subheading-text">
						Earn dark matter crystal by winning!
					</div>
					<button
						className="battle-battle-button"
						onClick={() => {
                            console.log(wallet);
                            if(wallet.connected){ 
                                setMatchMaking(!matchMaking);
                            }
                            else{
                                alert("Connect wallet to battle!")
                            }
						}}
					>
						Battle
					</button>
				</div>

				<div className="battle-open-shop">
					<br />
					<div className="battle-header-box-title shop-header-color">
						Unlock Quest
					</div>
					<div className="battle-battle-subheading-text">
						Earn a pack of powerful cards!
					</div>
					<button className="battle-shop-button">Shop</button>
				</div>
			</div>
		</div>
	);
};

export default Battle;
