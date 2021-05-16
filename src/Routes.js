import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import EditContact from './components/EditContact/EditContact';
import Home from './components/Home/Home';


const Routes = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/edit' component={EditContact} />
                </Switch>
            </Router>
        </div>
    );
};

export default Routes;