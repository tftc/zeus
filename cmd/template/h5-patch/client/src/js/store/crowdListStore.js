var Reflux = require('reflux');
var crowdListAction = require('../action/crowdListAction');
var $ = require('zepto-commonjs');
var crowdListStore = Reflux.createStore({
    listenables: [
        crowdListAction
    ],
    crowdList: [],
    init: function () {
        this.onFetchList();
    },
    onFetchList: function () {
        var self = this;
        $.ajax({
            url: 'api/getCrowdList',
            success: function (data) {
                self.crowdList = data;
                self.trigger({
                    crowdList: self.crowdList
                });
            }
        });
    },
    onNextList: function () {
        var self = this;
        $.ajax({
            url: 'api/getCrowdList',
            success: function (data) {
                self.crowdList = self.crowdList.concat(data);
                self.trigger({
                    crowdList: self.crowdList
                });
            }
        });
    }
});
module.exports = crowdListStore;
