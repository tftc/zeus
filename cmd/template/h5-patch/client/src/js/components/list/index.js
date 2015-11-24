require('./list.css');
var React = require('react');
var Reflux = require('reflux');
var crowdListStore = require('../../store/crowdListStore');
var crowdListAction = require('../../action/crowdListAction');
var List = React.createClass({
	mixins: [Reflux.connect(crowdListStore)],
	getInitialState: function () {
        return {crowdList: []};
    },
    componentDidMount: function () {
        crowdListAction.fetchList();
    },
	getList: function(){
		console.log(this.state.crowdList);
		return (
			<ul>
			{this.state.crowdList.map(function(item,i){
                return (
	                <li className="item" key={i}>
				      <a href="#">
				        <div>
				          <header>
				          	<span className="regbg">
				          		<marquee scrollamount="1" scrolldelay="50" className="marq">
				          			首投返现，限投100元
				          		</marquee>
				          	</span>
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
		)
		for(var i=0; i<this.state.crowdList.length; i++){
			items.push(
				
			)
		}
		return items;
	},
	render: function(){
    	return (
			<ul id="list">
			    {this.getList()}
			</ul>
		)
  	}
});
module.exports = List

