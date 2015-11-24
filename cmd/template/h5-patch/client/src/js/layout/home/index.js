var React = require('react');
var Foot = require('../../components/foot');
var Banner = require('../../components/banner');
var List = require('../../components/list');
var Home = React.createClass({
	render: function(){
    	return (<div className='sss'><Banner></Banner><Foot currentPage="home"></Foot><List></List></div>);
  	}
});
module.exports = Home;
