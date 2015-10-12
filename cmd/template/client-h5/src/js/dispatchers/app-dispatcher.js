var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppDispatcher = assign(new Dispatcher(), {
  handleViewAction: function(action){
    console.log("*****start handleViewAction******");
    console.log(action);
    console.log("*****end handleViewAction******");
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    })
  },
  creatTutAction : function(action) {
    console.log('=====start tutAction ======');
    console.log('=====end tutAction ======')
    this.dispatch({
        source: 'CREAT_TUT',
        action: action
    })
  },
  handleRequestAction: function(action){
    console.log("*****start handleRequestAction******");
    console.log(action);
    console.log("*****end handleRequestAction******");
    this.dispatch({
      source: 'WEB_API_ACTION',
      action: action
    })
  }
});

module.exports = AppDispatcher;