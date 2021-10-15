import { useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { fetchUserCards } from "../../actions";
import '../../css/mycards.css';
import CardView from "../ui/CardView";
const MyCards = () => {
    const cards = useSelector(state => state.userCards);
    const history = useHistory();
    const [myCards, setMyCards] = useState([]);
    const dispatch = useDispatch();
    const wallet = useWallet()
    useEffect(() => {
        if (wallet.publicKey != null) {
            dispatch(fetchUserCards({ address: wallet.publicKey.toString() }));
        }
    }, [dispatch, wallet]);

    useEffect(() => {
        setMyCards(cards);
    }, [cards]);


    return (<div>
        <div className="mycards-card-body">
            <div className="mycards-recently-listed">My Cards</div>
            <div className="mycards-grid">
                {cards.map((e, idx) => (
                    <div key={idx} className="card card-wide card-tall">
                        {/* <img src={e.image_uri} /> */}
                        <CardView  isPurple={e.rarity=="Purple"}  onClick={() => { history.push('/marketplace/card/' + e.mint_id, { from: window.location.pathname, name:"My Cards" }) }} image={e.image_uri} name={e.name} level={e.level} health={e.health} attackpoint={e.attackpoints} mana={e.mana} ></CardView>
                    </div>))
                }
            </div>
        </div>
    </div>

    )
}

export default MyCards;