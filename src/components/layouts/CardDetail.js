import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import backvampirePurple from '../../assets/card-vampire-back.png';
import '../../css/carddetail.css';
import { useDispatch, useSelector } from "react-redux";
import CardView from "../ui/CardView";
import { useWallet } from "@solana/wallet-adapter-react";
import { buynftToken } from "../../actions";

const CardDetail = () => {
    const { id } = useParams();
    const history = useHistory();
    const selector = useSelector(state => state.allCards);
    const [card, setCard] = useState({})
    const wallet = useWallet();
    const dispatch = useDispatch();
    useEffect(() => {
        let temp = selector.filter((obj) => obj.mint_id === id)[0];
        if (temp !== undefined) {
            console.log(temp);
            setCard(temp);
        }

    }, [selector]);
    const [sellPrice,setSellPrice]=useState(0);

    const onBuySell = () => {
        if (Object.keys(card).length !== 0) {
            if (wallet != undefined && wallet.publicKey != null && card.owner === wallet.publicKey.toString()) {
                // dispatch sell
                
            } else {
                dispatch(buynftToken(card, wallet));
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
                        <CardView onClick={() => { }} image={card.image_uri} name={card.name} level={card.level} health={card.health} attackpoint={card.attackpoints} isPurple={card.rarity=="Purple"} mana={card.mana} />
                        <div>

                            <div className="card-details-board">
                                <br />
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
                                <div className="card-details-view-row">
                                    <p className="card-details-view-attribute">Price</p>
                                    <p className="card-details-view-value">{card.price} lamports</p>
                                </div>
                            </div>
                            {/* {(wallet != undefined && wallet.publicKey != null && card.owner === wallet.publicKey.toString()) ? <div className="form-field-card-details-sell-card" ><input placeholder="Amount here" type="text"  value={sellPrice}  onChange={(e)=>setSellPrice(e.target.value)} /></div> : null} */}
                            <button onClick={onBuySell} className="card-details-buy-sell-button">{(wallet != undefined && wallet.publicKey != null && card.owner === wallet.publicKey.toString()) ? "SELL" : "BUY"}</button>

                        </div>
                    </div>
                </div>
                : null}
        </div>
    )
}

export default CardDetail;