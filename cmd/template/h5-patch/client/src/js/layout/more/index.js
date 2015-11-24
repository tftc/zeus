var React = require('react');
var Foot = require('../../components/foot');
var More = React.createClass({
    render: function(){
        return <div><div>更多</div><Foot currentPage="more"></Foot></div>;
    }
});
module.exports = More;