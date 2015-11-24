var React = require('react');
var Foot = require('../../components/foot');
var Account = React.createClass({
    render: function(){
        return <div><div>众筹</div><Foot currentPage="crowd"></Foot></div>;
    }
});
module.exports = Account