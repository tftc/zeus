var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var tutActionCreators = {
    creatTut : function(comment) {
        var action = {
            actionType : 'CREAT_TUT',
            comment : comment
        };
        AppDispatcher.creatTutAction(action);
    }
}

module.exports = tutActionCreators;