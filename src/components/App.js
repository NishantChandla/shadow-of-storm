import React from 'react';
import { Switch, Route } from 'react-router';
import Battle from './layouts/Battle';
import Home from './layouts/Home';
import Header from './sections/Header';
import Background from '../assets/parallax.png'
import '../css/app.css';
const App = () => {
    return (
        <div className="app-body" style={{ }}>
            <Header />
            <Switch>
                <Route path="/battle">
                    <Battle />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
                <Route path="/marketplace">
                    <Home />
                </Route>
            </Switch>
        </div>
    );
}

export default App;