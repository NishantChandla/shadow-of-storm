import '../../css/cardview.css';
const CardView = ({ image, name, attackpoint, health, mana, level }) => {


    return (
        <div className="cardview">
            <img src={image} />
            <div className="cardview-name">{name}</div>
            <div className="cardview-health">{health}</div>
            <div className="cardview-level">{level}</div>
            <div className="cardview-attack">{attackpoint}</div>
            <div className="cardview-mana"><br/> {mana}</div>

        </div>
    )
}

export default CardView;