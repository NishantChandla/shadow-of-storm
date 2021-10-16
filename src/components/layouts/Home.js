import { Link } from "react-router-dom";
import "../../css/home.css";
const Home = () => {
    return (
        <div className="home-center-container">
            <br />
            <p className="home-heading text-stroke">SHADOW OF STORM</p>
            <p className="home-subtitle text-stroke">A DIGITAL WORLD</p>
            <div className="home-flex-container">
                <p>Battle</p>
                <p>Collect</p>
                <p>Earn</p>
            </div>
            <Link style={{ textDecoration: "none" }} to='/marketplace'>
                <button className="text-stroke">
                    PLAY NOW
                </button>
            </Link>
        </div>

    );
};

export default Home;
