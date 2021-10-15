import "../../css/marketplace.css";
import Rairty1 from "../../assets/rarity1.png";
import Rairty2 from "../../assets/rarity2.png";
import Rairty3 from "../../assets/rarity3.png";

import Shadow1 from "../../assets/shadow1.png";
import Shadow2 from "../../assets/shadow2.png";
import Shadow3 from "../../assets/shadow3.png";

import Level1 from "../../assets/level1.png";
import Level2 from "../../assets/level2.png";
import Level3 from "../../assets/level3.png";
import Level4 from "../../assets/level4.png";
import Level5 from "../../assets/level5.png";
import Level6 from "../../assets/level6.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CardView from "../ui/CardView";
import { useHistory } from "react-router";


const MarketPlace = () => {
	const selector = useSelector(state => state.marketplaceData);
	const history = useHistory();
	const [marketData, setMarketData] = useState([]);
	const [rarity1, setRarity1] = useState(true);
	const [rarity2, setRarity2] = useState(true);
	const [rarity3, setRarity3] = useState(true);

	const [shadow1, setShadow1] = useState(true);
	const [shadow2, setShadow2] = useState(true);
	const [shadow3, setShadow3] = useState(true);

	const [level1, setLevel1] = useState(true);
	const [level2, setLevel2] = useState(true);
	const [level3, setLevel3] = useState(true);
	const [level4, setLevel4] = useState(true);
	const [level5, setLevel5] = useState(true);
	const [level6, setLevel6] = useState(true);

	useEffect(()=>{
		const cards = selector.filter((obj)=>{
			if(
				(!level6 && obj.level===6) ||
				(!level5 && obj.level===5) ||
				(!level4 && obj.level===4) ||
				(!level3 && obj.level===3) ||
				(!level2 && obj.level===2) ||
				(!level1 && obj.level===1)
				){
				return false;
			}
			if((!rarity1 && obj.rarity==="Purple") ||
			 (!rarity2 && obj.rarity==="Gold") ||
			 (!rarity3 && obj.rarity==="Silver")){
				return false
			 }
			 if((!shadow1 && obj.category==="Vampire") ||
			 (!shadow2 && obj.category==="Fantasy") ||
			 (!shadow3 && obj.category==="Scifi")){
				return false
			 }
			return true;
		});
		setMarketData(cards);
	},[selector, 
		rarity1, 
		rarity2, 
		rarity3, 
		shadow1, 
		shadow2, 
		shadow3, 
		level6, 
		level5, 
		level4, 
		level3, 
		level2, 
		level1
	]);


	return (
		<div>
			<div className="marketplace-filters-flex-container">
				<div className="vertical-filters-flex-containter">
					<div>Rarity</div>
					<div className="filter-child-flex-containter">
						<img src={Rairty1} onClick={()=>setRarity1(!rarity1)} className={`${rarity1?'selected-filter':'unselected-filter'}`} />
						<img src={Rairty2} onClick={()=>setRarity2(!rarity2)}  className={`${rarity2?'selected-filter':'unselected-filter'}`} />
						<img src={Rairty3} onClick={()=>setRarity3(!rarity3)}  className={`${rarity3?'selected-filter':'unselected-filter'}`} />
					</div>
				</div>
				<div className="vertical-filters-flex-containter">
					<div>Shadow</div>
					<div className="filter-child-flex-containter">
						<img src={Shadow1} onClick={()=>setShadow1(!shadow1)} className={`${shadow1?'selected-filter':'unselected-filter'}`} />
						<img src={Shadow2} onClick={()=>setShadow2(!shadow2)}  className={`${shadow2?'selected-filter':'unselected-filter'}`} />
						<img src={Shadow3} onClick={()=>setShadow3(!shadow3)}  className={`${shadow3?'selected-filter':'unselected-filter'}`} />
					</div>
				</div>
				<div className="vertical-filters-flex-containter">
					<div>Level</div>
					<div className="filter-child-flex-containter">
						<img src={Level1} onClick={()=>setLevel1(!level1)}  className={`${level1?'selected-filter':'unselected-filter'}`} />
						<img src={Level2} onClick={()=>setLevel2(!level2)}  className={`${level2?'selected-filter':'unselected-filter'}`} />
						<img src={Level3} onClick={()=>setLevel3(!level3)}  className={`${level3?'selected-filter':'unselected-filter'}`} />
						<img src={Level4} onClick={()=>setLevel4(!level4)}  className={`${level4?'selected-filter':'unselected-filter'}`} />
						<img src={Level5} onClick={()=>setLevel5(!level5)}  className={`${level5?'selected-filter':'unselected-filter'}`} />
						<img src={Level6} onClick={()=>setLevel6(!level6)}  className={`${level6?'selected-filter':'unselected-filter'}`} />
					</div>
				</div>
			</div>

			<div className="marketplace-card-body">
				<div className="marketplace-recently-listed">Recently Listed</div>
				<div className="marketplace-grid">
					{marketData.map((e, idx) => (
						<div className="card card-wide card-tall">
							<CardView onClick={() => { history.push('/marketplace/card/' + e.mint_id, { from: window.location.pathname, name:"Market" }) }} isPurple={e.rarity=="Purple"} image={e.image_uri} name={e.name} level={e.level} health={e.health} attackpoint={e.attackpoints} mana={e.mana} ></CardView>
						</div>))
					}
				</div>
			</div>

		</div >
	);
};

export default MarketPlace;
