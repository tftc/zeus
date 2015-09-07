var util = require('../util');
var addCurly = function (start, end) {
    util.insertBefore(start, {
        type: 'Punctuator',
        value: '{'
    });
    util.insertAfter(end, {
        type: 'Punctuator',
        value: '}'
    });
};

exports.fix = function (node) {
    if (node.type === 'ForStatement' && node.body.type !== 'BlockStatement') {
        addCurly(node.body.startToken, node.body.endToken);
    }

    if (node.type === 'IfStatement' && node.consequent && node.consequent.type !== 'BlockStatement') {
        addCurly(node.consequent.startToken, node.consequent.endToken);
    }

    if (node.type === 'IfStatement' && node.alternate && node.alternate.type !== 'BlockStatement') {
        addCurly(node.alternate.startToken, node.alternate.endToken);
    }

    if (node.type === 'WhileStatement' && node.body.type !== 'BlockStatement') {
        addCurly(node.body.startToken, node.body.endToken);
    }
};