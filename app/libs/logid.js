/**
 * @file logid.js
 * @desc logid产生
 * @author xiaoguang01
 * @date 2015/10/8
 */
exports.genLogid = function(){
    return Date.now()*1000+Math.floor(Math.random()*1000);
}