require('./list.css');
var React = require('react');
var ReactDOM = require('react-dom');
var Reflux = require('reflux');
var crowdListStore = require('../../store/crowdListStore');
var crowdListAction = require('../../action/crowdListAction');
var List = React.createClass({
	mixins: [Reflux.connect(crowdListStore)],
    getInitialState: function() {
		return {
			pull: false,
			from: 0,
			distance: 0,
			height: 56,
			refresh: false,
			loading: false,
			crowdList: []
		};
	},
	componentWillMount: function(){
		crowdListAction.fetchList();
	},
    componentDidMount: function () {
        var height = ReactDOM.findDOMNode(this.refs.ptr).offsetHeight;
		this.setState({height: height});
    },
	handleTouchStart: function(e) {
		var touch = e.touches[0];
		if (window.innerHeight + document.body.scrollTop > document.body.scrollHeight-10) {
			this.setState({pull: true, from: touch.pageY});
		}
	},
	handleTouchMove: function(e) {
		var touch = e.touches[0];
		if (this.state.pull) {
			e.preventDefault();
			var distance = (touch.pageY - this.state.from) / 2.5;
			this.setState({
				distance: distance,
				refresh: distance < 0,
				pull: distance　< 0
			});
		}
	},
	handleTouchEnd: function(e) {
		if (this.state.pull) {
			if (this.state.refresh) {
				this.setState({loading: true, distance: -20});
				crowdListAction.nextList();
				this._reset();
			} else {
				this._reset();
			}
		}
	},
	_reset: function() {
		this.setState({
			pull: false,
			distance: 0,
			loading: false,
			refresh: false
		});
	},
	getList: function(){
		var marquee = (
			<span className="regbg">
	      		<marquee scrollamount="1" scrolldelay="50" className="marq">
	      			首投返现，限投100元
	      		</marquee>
	      	</span>
	     );
		var contentTranslate = 'translate3d(0, ' + this.state.distance + 'px, 0)';
		var contentStyle = {
			transform: contentTranslate,
			WebkitTransform: contentTranslate
		};
		var ptrTranslate = 'translate3d(0, ' + (this.state.distance - this.state.height) + 'px, 0)'
		var ptrStyle = {
			transform: ptrTranslate,
			WebkitTransform: ptrTranslate
		};
		return (
			<div className="pull-to-refresh" style={ptrStyle} ref="ptr" >
			<ul id="list" style={contentStyle}
				onTouchStart={this.handleTouchStart}
				onTouchMove={this.handleTouchMove}
				onTouchEnd={this.handleTouchEnd}>
			{this.state.crowdList.map(function(item,i){
                return (
	                <li className="item" key={i}>
				      <a href="#">
				        <div>
				          <header>
				          	{item.ifFirst? marquee : ''}
				            {item.title}
				          </header>
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
				            <div className="desc">{item.desc}</div>
				          </section>
				          <section className="content">
				            <aside className="clearfix">
				              <div className="percent fl"><span>{item.percent}</span><span>%</span></div>
				              <div className="dateTime fr"><span className="number">{item.dateTime}</span><span className="unit">日</span></div>
				            </aside>
				            <aside className="btm clearfix">
				              <div className="base fl">{item.base}</div>
				              <div className="total fl">{item.total}</div>
				            </aside>
				          </section>
				        </div>
				      </a>
				    </li>
                )
            })}
			</ul>
			</div>
		);
	},
	render: function(){
    	return this.getList();
  	}
});
module.exports = List

