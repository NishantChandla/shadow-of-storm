import "../../css/marketplace.css";
import Rairty1 from "../../assets/rarity1.png";
import Rairty2 from "../../assets/rarity2.png";
import Rairty3 from "../../assets/rarity3.png";

import Shadow1 from "../../assets/shadow1.png";
import Shadow2 from "../../assets/shadow2.png";
import Shadow3 from "../../assets/shadow3.png";

import level1 from "../../assets/level1.png";
import level2 from "../../assets/level2.png";
import level3 from "../../assets/level3.png";
import level4 from "../../assets/level4.png";
import level5 from "../../assets/level5.png";
import level6 from "../../assets/level6.png";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardView from "../ui/CardView";


const MarketPlace = () => {
	const selector = useSelector(state=>state.marketplaceData);
	const [marketData, setMarketData] = useState([]);
	console.log(selector);

	useEffect(()=>{
		setMarketData(selector);
	},[selector]);


	return (
		<div>
			<div className="marketplace-filters-flex-container">
				<div className="vertical-filters-flex-containter">
					<div>Rarity</div>
					<div className="filter-child-flex-containter">
						<img src={Rairty1} />
						<img src={Rairty2} />
						<img src={Rairty3} />
					</div>
				</div>
				<div className="vertical-filters-flex-containter">
					<div>Shadow</div>
					<div className="filter-child-flex-containter">
						<img src={Shadow1} />
						<img src={Shadow2} />
						<img src={Shadow3} />
					</div>
				</div>
				<div className="vertical-filters-flex-containter">
					<div>Level</div>
					<div className="filter-child-flex-containter">
						<img src={level1} />
						<img src={level2} />
						<img src={level3} />
						<img src={level4} />
						<img src={level5} />
						<img src={level6} />
					</div>
				</div>
			</div>

			<div className="marketplace-card-body">
				<div className="marketplace-recently-listed">Recently Listed</div>
				<div className="marketplace-grid">
					{marketData.map((e, idx) => (
						<div className="card card-wide card-tall">
							<CardView image={e.image_uri} name={e.name} level={e.level} health={e.health} attackpoint={e.attackpoints} mana={e.mana} ></CardView>
						</div>))
					}
				</div>
			</div>

		</div >
	);
};

export default MarketPlace;
