var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
APP = require('./components/app').APP;
var Logout = require('./components/auth/app-logout');
var Login = require('./components/auth/app-login');
var About = require('./components/about/app-about');
var Dashboard = require('./components/dashboard/app-dashboard');
var Tut = require('./components/tut/app-tut');
var routes = (
  <Route handler={APP}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="about" handler={About}/>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="tut" handler={Tut}/>
  </Route>
);
Router.run(routes, function (Handler) {
    console.log(111);
  var demo = React.createFactory(Handler);
  var reactHtml = React.renderToString(demo());
  console.log(reactHtml);
  React.render(<Handler/>, document.getElementById('content'));
});