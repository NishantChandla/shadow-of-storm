import { useEffect, useState } from "react";
import { useParams } from "react-router";
import vampirePurlple from "../../assets/vampire-purple.png";
import backvampirePurple from "../../assets/card-vampire-back.png";
import '../../css/carddetail.css';
const CardDetail = () => {
    const { id } = useParams();
    const [card, setcard] = useState({ image: vampirePurlple, back: backvampirePurple, title: "Mighty Knight" })
    useEffect(() => {

    }, []);

    return (
        <div>
            <div className='card-details-header'>
                <p className='card-details-market-text'>{"< Market"}</p>
                <p className='card-details-header-title'>Mighty Knight</p>
            </div>
            <div className="card-details-view">
                <img src={backvampirePurple}/>
                <img src={vampirePurlple}/>
                <div className="card-details-board">
                        <div className="card-details-view-row card-details-view-row-one">
                            <p className="card-details-view-attribute">Rarity</p>
                            <p className="card-details-view-value">Gold</p>
                        </div>
                        <div className="card-details-view-row">
                            <p className="card-details-view-attribute">Rarity</p>
                            <p className="card-details-view-value">Gold</p>
                        </div>
                        <div className="card-details-view-row">
                            <p className="card-details-view-attribute">Rarity</p>
                            <p className="card-details-view-value">Gold</p>
                        </div>
                        <div className="card-details-view-row">
                            <p className="card-details-view-attribute">Health</p>
                            <p className="card-details-view-value">30</p>
                        </div>
                        <div className="card-details-view-row">
                            <p className="card-details-view-attribute">Skils</p>
                            <p className="card-details-view-value">50</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default CardDetail;