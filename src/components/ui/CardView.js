import '../../css/cardview.css';
const CardView = ({ image, name, attackpoint, health, mana, level, onClick, isPurple, id }) => {

    if (isPurple) {
        return <div id={id} image_uri={image} className="cardview" onClick={onClick}>
            < img src={image} />
            <div className="cardview-name-purple">{name}</div>
            <div className="heart-icon-purple"></div>
            <div className="cardview-health-purple">{health}</div>
            <div className="cardview-level-purple">{level}</div>
            <div className="attack-icon-purple"></div>
            <div className="cardview-attack-purple">{attackpoint}</div>
            <div className="cardview-mana"><br /> {mana}</div>
        </div >
    }

    return <div id={id} image_uri={image} className="cardview" onClick={onClick}>
        < img src={image} />
        <div className="cardview-name">{name}</div>
        <div className="heart-icon"></div>
        <div className="cardview-health">{health}</div>
        <div className="cardview-level">{level}</div>
        <div className="attack-icon"></div>
        <div className="cardview-attack">{attackpoint}</div>
        <div className="cardview-mana"><br /> {mana}</div>
    </div >;
}

export default CardView;