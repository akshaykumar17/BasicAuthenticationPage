import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Registration from '../components/Registration';
import UserLogin from '../components/UserLogin';
import Home from './home';
import Forgot from './forgot';
import Reset from './reset';
import Nav from './navbar';

if (document.getElementById('example')) {

    ReactDOM.render(
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Nav} />
                    <Route path="/login" component={UserLogin} />
                    <Route path="/register" component={Registration} />
                    <Route path='/home' component={Home} />
                    <Route path='/forgotpassword' component={Forgot} />
                    <Route path='/password/reset/:token' component={Reset} />
                </Switch>
            </div>
        </BrowserRouter>,
        document.getElementById('example'));
}
