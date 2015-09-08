var React = require('react');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');
var About = React.createClass({
  mixins: [ AuthenticationMixin ],
  render: function () {
    return (
    	<div>
    		About
    	</div>
    	);
  }
});
module.exports = About;