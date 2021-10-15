import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import backvampirePurple from '../../assets/card-vampire-back.png';
import '../../css/carddetail.css';
import { useSelector } from "react-redux";
import CardView from "../ui/CardView";
import { useWallet } from "@solana/wallet-adapter-react";

const CardDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const selector = useSelector(state => state.allCards);
    const [card, setCard] = useState({})
    const wallet = useWallet();

    useEffect(() => {
        let temp = selector.filter((obj) => obj.mint_id === id)[0];
        console.log(temp);
        if (temp !== undefined) {
            console.log(temp);
            setCard(temp);
        }
    }, [selector]);

    const onBuySell = () => {
        if (Object.keys(card).length !== 0) {
            if (card.owner === wallet.publicKey) {
                // dispatch sell
            } else {
                // dispatch buy
            }
        }
    }

    return (
        <div>{
            Object.keys(card).length !== 0 ?
                <div>
                    <div className='card-details-header'>
                        <p onClick={() => history.push(history.location.state.from)} className='card-details-market-text'>{`< ${history.location.state.name}`}</p>
                        <p className='card-details-header-title'>{card.name}</p>
                    </div>
                    <div className="card-details-view">
                        <img style={{ width: "249px", height: "381px" }} src={backvampirePurple} />
                        <CardView onClick={() => { }} image={card.image_uri} name={card.name} level={card.level} health={card.health} attackpoint={card.attackpoints} mana={card.mana} />
                        <div>
                            <div className="card-details-board">
                                <div className="card-details-view-row card-details-view-row-one">
                                    <p className="card-details-view-attribute">Rarity</p>
                                    <p className="card-details-view-value">{card.rarity}</p>
                                </div>
                                <div className="card-details-view-row">
                                    <p className="card-details-view-attribute">Shadow</p>
                                    <p className="card-details-view-value">{card.category}</p>
                                </div>
                                <div className="card-details-view-row">
                                    <p className="card-details-view-attribute">Mana</p>
                                    <p className="card-details-view-value">{card.mana}</p>
                                </div>
                                <div className="card-details-view-row">
                                    <p className="card-details-view-attribute">Health</p>
                                    <p className="card-details-view-value">{card.health}</p>
                                </div>
                                <div className="card-details-view-row">
                                    <p className="card-details-view-attribute">Attack points</p>
                                    <p className="card-details-view-value">{card.attackpoints}</p>
                                </div>
                                <div className="card-details-view-row">
                                    <p className="card-details-view-attribute">Level</p>
                                    <p className="card-details-view-value">{card.level}</p>
                                </div>
                                <div className="card-details-view-row">
                                    <p className="card-details-view-attribute">Ability</p>
                                    <p className="card-details-view-value">None</p>
                                </div>
                            </div>
                            <button onClick={onBuySell} className="card-details-buy-sell-button">{(card.owner === wallet.publicKey) ? "SELL" : "BUY"}</button>

                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default CardDetail;