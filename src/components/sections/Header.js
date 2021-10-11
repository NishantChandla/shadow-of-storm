import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../css/header.css';
import { Wallet } from './ConnnectWallet';
import logo from "../../assets/logo.png";
import market from "../../assets/market.png";
import battle from "../../assets/battle.png";
import cards from "../../assets/cards.png";
import shop from "../../assets/shop.png";

const Header = (props) => {
    return (
        <div className="header-container">
            <Link className="header-title" to="/"><img src={logo} /></Link>
            <Link className="header-link" to="/marketplace">
                <div className="item-logo-container">
                <img src={shop} /> 
              <p>Shop</p>
                </div>
            </Link>
            <Link className="header-link" to="/marketplace">
                <div className="item-logo-container">
                <img src={market} /> 
                <p>Market</p>
                </div>
            </Link>
            <Link className="header-link" to="/marketplace">
                <div className="item-logo-container">
                <img src={cards} /> 
                  <p>Cards</p>
                </div>
            </Link>
            <Link className="header-link" to="/marketplace">
                <div className="item-logo-container">
                <img src={battle} /> 
              <p>Battle</p>
                </div>
            </Link>
            <div className="header-end">
                <div className="header-wallet"><Wallet /></div>
            </div>
        </div>
    );
}



export default Header;
