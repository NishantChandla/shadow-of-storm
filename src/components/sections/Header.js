import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../css/header.css';
import { Wallet } from './ConnnectWallet';

const Header = (props) => {

    return (
        <div className="header-container">

            <Link className="header-title" to="/">Shadow of Strom</Link>
            <Link className="header-link" to="/marketplace">News</Link>
            <div className="header-end">
                <div className="header-wallet"><Wallet /></div>
            </div>
        </div>
    );
}



export default Header;
