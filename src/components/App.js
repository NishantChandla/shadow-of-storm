import React from 'react';
import { Switch, Route } from 'react-router';

import Battle from './layouts/Battle';
import BuildDeck from './layouts/BuildDeck';
import Home from './layouts/Home';
import Header from './sections/Header';

const App = () => {
    return (
        <div>
            <Header/>
            <Switch>
                <Route path="/build-deck">
                    <BuildDeck />
                </Route>
                <Route path="/battle">
                    <Battle />
                </Route>
                <Route path="/">
                    <Home/>
                </Route>
            </Switch>
        </div>
    );
}

export default App;