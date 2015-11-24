var Reflux = require('reflux');
var crowdListAction = require('../action/crowdListAction');
var crowdListStore = Reflux.createStore({
	listenables: [crowdListAction],
	init: function() {
	    this.onFetchList();
	},
	onFetchList: function() {
		this.trigger({
			crowdList: [
				{
					ifFirst: true,
					title: '老人专享项目T001-15010-27',
					percent: '7.00',
					dateTime: '365',
					base: '起投300,000元',
					total: '总额30万',
					desc: '一次性还本息',
					status: '1'
				},
				{
					ifFirst: false,
					title: '新人专享项目T002-15010-27',
					percent: '8.00',
					dateTime: '100',
					base: '起投2,000元',
					total: '总额10万',
					desc: '一次性还本息',
					status: '2'
				}

			]
		});
	}
});
module.exports = crowdListStore;