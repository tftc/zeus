var React = require('react');
var tutActionCreators = require('../../actions/app-tut');
var tut = React.createClass({
    onSubmit : function(e) {
        var textNode = this.refs.text.getDOMNode();
        var text = textNode.value;
        textNode.value = '';
        tutActionCreators.creatTut({
            text : text
        });
    },
    render : function() {
        return (
            <div className='comment-form'>
                <textarea ref='text' />
                <button onClick={this.onSubmit}>提交</button>
            </div>
        );
    }
});
module.exports = tut;