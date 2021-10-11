import React from 'react';
import { Switch, Route } from 'react-router';
import Battle from './layouts/Battle';
import BuildDeck from './layouts/BuildDeck';
import Home from './layouts/Home';
import Header from './sections/Header';
import MarketPlace from './layouts/MarketPlace';
import '../css/app.css';
const App = () => {
    return (
        <div className="app-body" style={{ }}>
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