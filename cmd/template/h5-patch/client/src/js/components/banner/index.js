var React = require('react');
require('./banner.css');
var Banner = React.createClass({
    render: function () {
        return (
            <a className="banner-outer">
                <div className="banner-inner">
                    <div className="banner-text">甜菜精选</div>
                </div>
            </a>
            )
    }
})
module.exports = Banner;
