var React = require('react');
var ReactDom = require('react-dom');
var Reflux = require('reflux');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
require('./index.css');
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

var Demo = React.createClass({
	mixins: [Reflux.connect(Store, 'datas')],
	getInitialState: function() {
        return {
	        datas: {data: []}
	    }
	},
	
	render: function(){
		var list = [];
		console.log(this.state.datas);
		this.state.datas.data.forEach(function(item){
			list.push(<li className="list-item">姓名{item.name}  年龄{item.age}</li>)
		});
    	return <div className='sss'>{list}</div>;
  	}
});

Actions.fetch();

var routers = (
	<Router>
    	<Route path='/' component={Demo}></Route>
  	</Router>
);

ReactDom.render(routers, document.getElementById('content'));

