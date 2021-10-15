import '../../css/cardview.css';
const CardView = ({ image, name, attackpoint, health, mana, level, onClick }) => {


    return (
        <div className="cardview" onClick={onClick}>
            <img src={image} />
            <div className="cardview-name">{name}</div>
            <div className="heart-icon"></div>
            <div className="cardview-health">{health}</div>
            <div className="cardview-level">{level}</div>
            <div className="attack-icon"></div>
            <div className="cardview-attack">{attackpoint}</div>
            <div className="cardview-mana"><br /> {mana}</div>
        </div>
    )
}

export default CardView;