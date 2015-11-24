var React = require('react');
var Foot = require('../../components/foot');
var Crowd = React.createClass({
    render: function(){
        return <div><div>账户中心</div><Foot currentPage="account"></Foot></div>;
    }
});
module.exports = Crowd