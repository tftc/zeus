require('../style/common.css');
var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Home = require('./layout/home');
var Crowd = require('./layout/crowd');
var Account = require('./layout/account');
var More = require('./layout/more');
var routers = (
    <Router>
        <Route path='/' component={Home}></Route>
        <Route path='/account' component={Account}></Route>
        <Route path='/crowd' component={Crowd}></Route>
        <Route path='/more' component={More}></Route>
    </Router>
);
ReactDom.render(routers, document.getElementById('content'));

