var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
require('./common.css');
require('./foot.css');
require('./list.css');
require('./banner.css');
var Actions = Reflux.createActions([
  'fetch'
]);

var Store = Reflux.createStore({
	listenables: [Actions],
	init: function() {
	    this.onFetch();
	},
	onFetch: function() {
		this.trigger({
			data: [
				{name:'xiaoguang',age:'30'},
				{name:'xiaoting',age:'24'}
			]
		});
	}
})

var Index = React.createClass({
	render: function(){
    	return <div className='sss'><Banner></Banner><Foot></Foot><List></List></div>;
  	}
});
var Foot = React.createClass({
	getInitialState(){
		return {
			data:'111'
		};
	},
	render: function(){
    	return (
			<footer id="footer">
			<nav>
			  <a href="/" target="_self" className="sel">
			    <aside><i className="index iconfont">&#xe600;</i>
			      <p>首页</p>
			    </aside>
			  </a>
			  <a href="/crowdfunding" target="_self">
			    <aside><i className="crowdfunding iconfont">&#xe635;</i>
			      <p>众筹</p>
			    </aside>
			  </a>
			  <a href="/account" target="_self">
			    <aside className="sel"><i className="account iconfont">&#xe602;</i>
			      <p>账户</p>
			    </aside>
			  </a>
			  <a href="/setting" target="_self">
			    <aside><i className="more iconfont">&#xe603;</i>
			      <p>更多</p>
			    </aside>
			  </a>
			</nav>
			</footer>
		)
  	}
});


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



var List = React.createClass({
	render: function(){
    	return (
			<ul id="list">
			    <li className="item">
			      <a href="#">
			        <div>
			          <header><span className="regbg"><marquee scrollamount="1" scrolldelay="50" className="marq">首投返现，限投100元</marquee></span> 新人专享项目T002-15010-23</header>
			          <section className="contentR fr">
			            <div className="status">
			              <input type="hidden" value="0" className="num"/>
			              <aside className="cover"></aside>
			              <aside className="left">
			                <aside className="leftin"></aside>
			              </aside>
			              <aside className="right">
			                <aside className="rightin"></aside>
			              </aside>
			              <aside className="inner hasDate">
			                <p>11月16日</p>
			                <p>开始</p>
			              </aside>
			            </div>
			            <div className="desc">一次性还本付息</div>
			          </section>
			          <section className="content">
			            <aside className="clearfix">
			              <div className="percent fl"><span>7.00</span><span>%</span></div>
			              <div className="dateTime fr"><span className="number">15</span><span className="unit">日</span></div>
			            </aside>
			            <aside className="btm clearfix">
			              <div className="base fl">起投100元</div>
			              <div className="total fl">总额5万</div>
			            </aside>
			          </section>
			        </div>
			      </a>
			    </li>
			    <li className="item">
			      <a href="#">
			        <div>
			          <header><span className="regbg"><marquee scrollamount="1" scrolldelay="50" className="marq">首投返现，限投100元</marquee></span> 新人专享项目T002-15010-23</header>
			          <section className="contentR fr">
			            <div className="status">
			              <input type="hidden" value="0" className="num"/>
			              <aside className="cover"></aside>
			              <aside className="left">
			                <aside className="leftin"></aside>
			              </aside>
			              <aside className="right">
			                <aside className="rightin"></aside>
			              </aside>
			              <aside className="inner hasDate">
			                <p>11月16日</p>
			                <p>开始</p>
			              </aside>
			            </div>
			            <div className="desc">一次性还本付息</div>
			          </section>
			          <section className="content">
			            <aside className="clearfix">
			              <div className="percent fl"><span>7.00</span><span>%</span></div>
			              <div className="dateTime fr"><span className="number">15</span><span className="unit">日</span></div>
			            </aside>
			            <aside className="btm clearfix">
			              <div className="base fl">起投100元</div>
			              <div className="total fl">总额5万</div>
			            </aside>
			          </section>
			        </div>
			      </a>
			    </li>
			    <li className="item">
			      <a href="#">
			        <div>
			          <header><span className="regbg"><marquee scrollamount="1" scrolldelay="50" className="marq">首投返现，限投100元</marquee></span> 新人专享项目T002-15010-23</header>
			          <section className="contentR fr">
			            <div className="status">
			              <input type="hidden" value="0" className="num"/>
			              <aside className="cover"></aside>
			              <aside className="left">
			                <aside className="leftin"></aside>
			              </aside>
			              <aside className="right">
			                <aside className="rightin"></aside>
			              </aside>
			              <aside className="inner hasDate">
			                <p>11月16日</p>
			                <p>开始</p>
			              </aside>
			            </div>
			            <div className="desc">一次性还本付息</div>
			          </section>
			          <section className="content">
			            <aside className="clearfix">
			              <div className="percent fl"><span>7.00</span><span>%</span></div>
			              <div className="dateTime fr"><span className="number">15</span><span className="unit">日</span></div>
			            </aside>
			            <aside className="btm clearfix">
			              <div className="base fl">起投100元</div>
			              <div className="total fl">总额5万</div>
			            </aside>
			          </section>
			        </div>
			      </a>
			    </li>
			     <li className="item">
			      <a href="#">
			        <div>
			          <header><span className="regbg"><marquee scrollamount="1" scrolldelay="50" className="marq">首投返现，限投100元</marquee></span> 新人专享项目T002-15010-23</header>
			          <section className="contentR fr">
			            <div className="status">
			              <input type="hidden" value="0" className="num"/>
			              <aside className="cover"></aside>
			              <aside className="left">
			                <aside className="leftin"></aside>
			              </aside>
			              <aside className="right">
			                <aside className="rightin"></aside>
			              </aside>
			              <aside className="inner hasDate">
			                <p>11月16日</p>
			                <p>开始</p>
			              </aside>
			            </div>
			            <div className="desc">一次性还本付息</div>
			          </section>
			          <section className="content">
			            <aside className="clearfix">
			              <div className="percent fl"><span>7.00</span><span>%</span></div>
			              <div className="dateTime fr"><span className="number">15</span><span className="unit">日</span></div>
			            </aside>
			            <aside className="btm clearfix">
			              <div className="base fl">起投100元</div>
			              <div className="total fl">总额5万</div>
			            </aside>
			          </section>
			        </div>
			      </a>
			    </li>
			</ul>
		)
  	}
});

var routers = (
	<Router>
    	<Route path='/' component={Index}></Route>
  	</Router>
);

Actions.fetch();


ReactDom.render(routers, document.getElementById('content'));

