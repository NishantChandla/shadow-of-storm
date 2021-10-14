import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router';
import { io } from 'socket.io-client';

import Battle from './layouts/Battle';
import BuildDeck from './layouts/BuildDeck';
import Home from './layouts/Home';
import Header from './sections/Header';
import MarketPlace from './layouts/MarketPlace';
import '../css/app.css';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch();

    useEffect(()=>{
        const newSocket = io(`ws://localhost:3001`);
        dispatch({type:"SET_SOCKET", payload:newSocket})
    },[dispatch]);

    return (
        <div className="app-body" style={{}}>
            <Header />
            <Switch>
                <Route path="/marketplace">
                    <MarketPlace />
                </Route>
                <Route path="/build-deck">
                    <BuildDeck />
                </Route>
                <Route path="/battle">
                    <Battle />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;