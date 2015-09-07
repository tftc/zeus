var util = require('../util');

exports.fix = function (node) {
    if (node.type === 'DebuggerStatement') {
        if (node.startToken === node.endToken) {
            util.removeToken(node.startToken);
        } else {
            if (util.isLineBreak(node.endToken.next)) {
                util.removeToken(node.endToken.next);
            }
            util.removeToken(node.endToken);
            util.removeToken(node.startToken);
        }
    }
};