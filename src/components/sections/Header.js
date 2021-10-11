import React from 'react';
import { useSelector} from 'react-redux';

const Header = () => {
    const selector = useSelector(state => {return state.walletConfig.user});

    return (
            <div className="ui menu black" style={{'marginTop':'5px'}}>
                <a href="/#" className="ui header item">Template</a>

                <div className="right menu">
                    {(selector.userAddress==="")?
                    <a href="/#" className="item">Connect Wallet</a>:
                    <a href="/#" className="item">Disconnect Wallet</a>}
                </div>
            </div>
        );
}

export default Header;