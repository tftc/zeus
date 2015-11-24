require('./foot.css');
var React = require('react');
var Foot = React.createClass({
	getInitialState : function(){
		return {
			activeIndex:1
		};
	},
	render: function(){
    	return (
			<footer id="footer">
				<nav>
				  <a href="/#/" target="_self">
				    <aside className={this.props.currentPage=='home' ? 'sel' : ''}><i className="index iconfont">&#xe600;</i>
				      <p>首页</p>
				    </aside>
				  </a>
				  <a href="/#/crowd" target="_self">
				    <aside className={this.props.currentPage=='crowd' ? 'sel' : ''}><i className="crowdfunding iconfont">&#xe635;</i>
				      <p>众筹</p>
				    </aside>
				  </a>
				  <a href="/#/account" target="_self">
				    <aside className={this.props.currentPage=='account' ? 'sel' : ''}><i className="account iconfont">&#xe602;</i>
				      <p>账户</p>
				    </aside>
				  </a>
				  <a href="/#/more" target="_self">
				    <aside className={this.props.currentPage=='more' ? 'sel' : ''}><i className="more iconfont">&#xe603;</i>
				      <p>更多</p>
				    </aside>
				  </a>
				</nav>
			</footer>
		)
  	}
});
module.exports = Foot;